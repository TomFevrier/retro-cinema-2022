import { min, sum, shuffle } from 'd3-array';
import { uniqBy } from 'lodash-es';

import { formatLocale } from 'd3-format';
import { timeFormatLocale } from 'd3-time-format';

const { format } = formatLocale({
	decimal: ',',
    thousands: '.',
    grouping: [3],
    currency: ['', ' €'],
	percent: ' %',
    nan: 'N/A'
});

const { format: timeFormat } = timeFormatLocale({
	dateTime: '%A %e %B %Y à %X',
	date: '%d/%m/%Y',
	time: '%H:%M:%S',
	periods: ['AM', 'PM'],
	days: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
	shortDays: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
	months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
	shortMonths: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
});


const typografix = (html) => {
	if (!html) return '';

	let output = html;

	// Guillemets français et espaces non sécables
	const matchesGuillemets = output.match(/"[^\"]*"/g);
	matchesGuillemets && matchesGuillemets.forEach(match => {
		output = output.replace(match, `&laquo;&nbsp;${match.slice(1, -1)}&nbsp;&raquo;`);
	});

	// Gras
	const matchesBold = output.match(/\*[^\*]*\*/g);
	matchesBold && matchesBold.forEach(match => {
		output = output.replace(match, `<b>${match.slice(1, -1)}</b>`);
	});

	// Italique
	const matchesItalic = output.match(/_[^_]*_/g);
	matchesItalic && matchesItalic.forEach(match => {
		output = output.replace(match, `<i>${match.slice(1, -1)}</i>`);
	});

	// Liens
	const matchesLinks = output.match(/\[[^\[\]]*\]\([^\s\(\)]+\)/g);
	matchesLinks && matchesLinks.forEach(match => {
		const url = match.match(/\(\S+\)/)[0].slice(1, -1);
		const text = match.match(/\[.+\]/)[0].slice(1, -1);
		output = output.replace(match, `<a href=${url} target=_blank>${text}</a>`);
	});

	output = output
		.replace(/  /g, " ")					// Doubles espaces
		.replace(/'/g, "’")						// Apostrophes
		.replace(/ :/g, "&nbsp;:")				// Espaces non sécables
		.replace(/ ;/g, "&nbsp;;")
		.replace(/ !/g, "&nbsp;!")
		.replace(/ \?/g, "&nbsp;?")
		.replace(/ - /g, " &mdash;&nbsp;")		// Tirets cadratins
		.replace(/ \%/g, "&nbsp;%");			// Pourcentages

	return output;
}


const preloadImages = async (list) => {
	const images = await Promise.all(list.map(([id, filename]) => {
		return new Promise((resolve) => {
			const img = new Image();
			img.src = filename;
			img.addEventListener('load', () => {
				resolve([id, img]);
			});
		});
	}));
	return new Map(images);
}


const preloadPosters = async (data) => {
	const filenames = uniqBy(data, 'imdbId')
		.map((d) => [d.imdbId || d.title, `posters/${d.imdbId || d.title}.jpg`]);
	return preloadImages(filenames);
}


const formatPercentage = (nb, decimals = 1) => {
	return `${(nb * 100).toLocaleString('fr-FR', {
		maximumFractionDigits: decimals
	})}&nbsp;%`;
}


const formatTime = (time) => {
	const days = ~~(time / 1440);
	const hours = ~~(time / 60) - days * 24;
	const minutes = time % 60;

	// return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

	const tokens = [
		days > 1 ? `${days}&nbsp;jours` : null,
		hours > 0 ? `${days === 1 ? 24 + hours : hours}&nbsp;heure${hours > 1 ? 's' : ''}` : null,
		minutes > 0 ? `${minutes}&nbsp;minute${minutes > 1 ? 's' : ''}` : null,
	].filter((e) => e);

	return `${tokens.slice(0, -1).join(', ')} et ${tokens.slice(-1)[0]}`;
}


const formatDuration = (duration) => {
	const hours = ~~(duration / 60);
	const minutes = duration % 60;

	const tokens = [
		hours > 0 ? `${hours}h` : null,
		minutes > 0 ? (hours > 0 ? minutes.toString().padStart(2, '0') : `${minutes} min`) : null,
	].filter((e) => e);

	return tokens.join('');
}


const formatString = (str, data) => {
	const unique = uniqBy(data, 'imdbId');
	const output = str
		.replace('{{ TOTAL_TIME }}', formatTime(sum(data, (d) => d.runtime)))
		.replace('{{ NB_MOVIES }}', unique.length)
		.replace('{{ OLDEST_RELEASE }}', min(unique, (d) => d.year))
		.replace('{{ NB_MOVIES_THEATER }}', unique.filter((d) => isInCategory(d, 'theater')).length)
		.replace('{{ NB_MOVIES_HOME }}', unique.filter((d) => isInCategory(d, 'home')).length)
		.replace('{{ NB_MOVIES_REWATCH }}', unique.filter((d) => isInCategory(d, 'rewatch')).length)
		.replace('{{ NB_MOVIES_DISCOVERY }}', unique.filter((d) => isInCategory(d, 'discovery')).length)
		.replace('{{ NB_MOVIES_SPIELBERG }}', unique.filter((d) => isInCategory(d, 'spielberg')).length)
		.replace('{{ TIME_CLUB_ETOILE }}', formatTime(sum(data.filter((d) => isInCategory(d, 'clubEtoile')), (d) => d.runtime)))
		.replace('{{ NB_COUNTRIES }}', [...new Set(unique.map((d) => d.country))].length)
		.replace('{{ NB_FEMALE_DIRECTORS }}', unique.filter((d) => d.femaleDirector).length);
		
	return typografix(output);
}


const formatList = (list, options = {}) => {
	const tokens = options.dates
		? list.map((date, i, array) => {
			if (i + 1 < array.length && array[i + 1].getMonth() === date.getMonth()) {
				return date.getDate().toString().replace(/^1$/, '1er');
			}
			return date
				.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
				.replace(/^1 /, '1er ');
		})
		: list;

	if (tokens.length === 1) {
		return typografix(tokens[0]);
	}
	return typografix(`${tokens.slice(0, -1).join(', ')} &&nbsp;${tokens.slice(-1)[0]}`);
}


const getMovieSelection = (movies) => {
	if (movies.length === 1) {
		return typografix(movies[0].title);
	}

	if (movies.length <= 3) {
		const titles = movies.slice(0, 3).map((d) => typografix(d.title));
		return `${titles.slice(0, movies.length - 1).join(', ')} & ${titles[movies.length - 1]}`;
	}

	const moviesInTheater = movies.filter((d) => d.medium.includes('Cinéma') && d.year === 2022);
	if (moviesInTheater.length >= 3) {
		const titles = shuffle(moviesInTheater).slice(0, 3).map((d) => typografix(d.title));
		return `dont ${titles.slice(0, 3).join(', ')}...`;
	}

	const titles = movies.slice(0, 3).map((d) => typografix(d.title));
	return `dont ${shuffle(titles).slice(0, 3).join(', ')}...`;
}


const getTickFormat = (tickTemplate) => {
    if (!tickTemplate.includes('|')) {
        return timeFormat(tickTemplate);
    }
    const [template, suffix] = tickTemplate.split('|');
    return (d) => `${format(template)(d)} ${suffix}`.trim();
}


const isInCategory = (d, category) => {
	switch(category) {
		case 'theater':
			return d.medium.includes('Cinéma') && (d.year >= 2021 || d.directors.includes('Tetsuya Mariko'));
		case 'festival':
			return d.comment && d.comment.includes('Festival');
		case 'home':
			return !d.medium.includes('Cinéma') && d.year === 2022;
		case 'top':
			return d.comment === 'Top 10';
		case 'rewatch':
			return d.rewatch;
		case 'discovery':
			return ((d.medium.includes('Cinéma') && d.year < 2022) || (!d.medium.includes('Cinéma') && d.year < 2022)) && !d.rewatch;
		case 'spielberg':
			return d.director ? d.director === 'Steven Spielberg' : d.directors.includes('Steven Spielberg');
		case 'clubEtoile':
			return d.medium === 'Cinéma Club de l\'Étoile';
		default:
			return true;
	}
}


export {
	typografix,
	preloadImages,
	preloadPosters,
	formatPercentage,
	formatTime,
	formatDuration,
	formatString,
	formatList,
	getMovieSelection,
	getTickFormat,
	isInCategory
};