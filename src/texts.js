const texts = {
	grid: {
		all: [
			`*{{ TOTAL_TIME }}*. C'est le temps que j'ai passé l'année dernière à regarder des films, que ce soit chez moi ou au cinéma. C'est 4 jours de plus que [l'année dernière](https://tomfevrier.io/retro-cinema-2021/).`,
			`Cela représente *{{ NB_MOVIES }} longs-métrages*, sortis entre {{ OLDEST_RELEASE }} et 2022 et venant des quatre coins du monde : des États-Unis à Taïwan, en passant par la France, la Lituanie et le Japon.`
		],
		theater: [
			`Pour cette première année depuis 2019 sans fermeture des cinémas, je suis allé voir *{{ NB_MOVIES_THEATER }} films à l'affiche en salle*... certains même plusieurs fois, comme *Everything Everywhere All at Once* (4 visionnages !).`,
			`Deux fois plus [qu'en 2021](https://tomfevrier.io/retro-cinema-2021/), toujours grâce à mon CinéPass Pathé.`
		],
		festival: [
			`J'ai eu la chance de découvrir plusieurs de ces films au cours de festivals.`,
			`Celui de *Gérardmer* fin janvier, avec 12 films en moins de 3 jours (j'ai testé pour vous, c'est beaucoup trop). Et l'*Arras Film Festival* du 8 au 10 novembre.`
		],
		home: `J'ai également découvert *{{ NB_MOVIES_HOME }} films sortis l'année dernière chez moi* (sorties VOD ou rattrapages). Principalement sur Netflix, mais aussi par des moyens pas vraiment légaux.`,
		top: `Parmi tous ces films sortis en 2022, *voici mes 10 préférés*. Retrouvez le classement et mon avis rapide sur chacun d'entre eux tout en bas de cette page.`,
		rewatch: [
			`*J’ai revu beaucoup moins de films* l'année passée [qu'en 2021](https://tomfevrier.io/retro-cinema-2021/), seulement *{{ NB_MOVIES_REWATCH }}*.`,
			`À noter : le traditionnel marathon annuel du *Seigneur des Anneaux* le 6 février, mais aussi la *trilogie Cornetto* au Club de l'Étoile le 18 juin, et *Avatar* lors de sa ressortie en salle au mois de septembre.`
		],
		discovery: [
			`2022 a encore été une année de découverte, avec *{{ NB_MOVIES_DISCOVERY }} films que je n'avais jamais vus auparavant*.`,
			`Et parmi eux, quelques classiques (*Alien*, *La Mouche*, *Le Pacte des loups*, *L'Exorciste*), mais aussi quelques coups de cœur personnels (*Joint Security Area*, *Le Roi de cœur*, *Coherence*, *Swiss Army Man*...).`
		],
		spielberg: [
			`Parmi ces revisionnages et ces découvertes, *{{ NB_MOVIES_SPIELBERG }} films de Steven Spielberg*, dont je tente de rattraper l'ensemble de la filmographie (presque) dans l'ordre, d'ici la sortie de *The Fabelmans* le 22 février prochain.`
		],
		clubEtoile: [
			`En 2022, j'ai encore passé beaucoup de temps sur les fauteuils de mon cinéma fétiche, le *Club de l'Étoile... À vrai dire, exactement {{ TIME_CLUB_ETOILE }}*.`,
			`Je me suis laissé surprendre par des films plus ou moins étranges lors des séances Unknown Movies, j'y ai subi la propagande d'un film de guerre chinois, et j'ai pu y découvrir les controversés *Event Horizon* et *Le Seigneur des Anneaux* version animée.`,
		]
	},
	watchDate: [
		`Voici le temps que j'ai passé, *jour par jour*, à regarder des films en 2022.`,
		`Outre mon week-end cinéphile à Gérardmer et les marathons Le Seigneur des Anneaux et Edgar Wright, il m'est fréquemment d'aller voir 2 ou 3 films au cinéma dans la même journée.`
	],
	releaseDate: [
		`Encore une fois, plus de 80 % des films que j'ai regardés l'année dernière sont sortis après l'an 2000, et *plus de 60 % en 2021 ou 2022*.`,
		`Le film le plus ancien ? *La Vie future*, réponse méconnue au _Metropolis_ de Fritz Lang par H. G. Wells (auteur de _La Guerre des mondes_ et de _La Machine à explorer le temps_).`
	],
	medium: [
		`La salle de cinéma reste pour moi l'endroit privilégié pour découvrir un film : en 2022, j'ai passé plus de *12 jours dans les salles obscures !*`,
		`Netflix et le téléchargement illégal restent les deux moyens principaux de regarder des films chez moi... en attendant de pouvoir profiter des quelques Blu-Ray que je me suis procurés ces dernières années.`
	],
	originCountry: [
		`En 2022, j'aurai vu des films provenant de *{{ NB_COUNTRIES }} pays différents*, dont je n'avais parfois vu aucun film auparavant - l'Islande, la Finlande, l'Ukraine ou la Turquie, par exemple.`,
		`Toujours 20 % de films français, mais moins de films américains que [l'année dernière](https://tomfevrier.io/retro-cinema-2021/) et plus de films asiatiques (Japon et Corée du Sud, notamment).`
	],
	genres: [
		// TODO
		`Outre les genres courants (comédie, drame, action, aventure), les films que j'ai vus cette année trahissent mes goûts en terme de cinéma.`,
		`On trouve ainsi *un grand nombre de longs-métrages de genre* (horreur, thriller, science-fiction & fantastique), dont beaucoup de films français de l'année : *Le dernier voyage*, *La Nuée*, *Teddy*, *Oxygène*, *Titane*, etc.`,
		`On recense également un certain nombre de *comédies musicales* : *Annette*, les deux adaptations de *West Side Story*, mais aussi *D'où l'on vient*, *tick, tick... Boom!* ou *Encanto*. Décidément, 2021 est l'année de ma rencontre avec Lin-Manuel Miranda !`
	],
	womenDirectors: [
		// En 2021 : 18 films réalisés ou coréalisés par des femmes (16 sans coréalisateur)
		`Nouveauté de cette année, je me suis intéressé au genre des cinéastes. Le constat est sans appel : *seuls {{ NB_WOMEN_DIRECTORS }} films vus cette année étaient réalisés ou coréalisés par des femmes*, soit moins de 10 % du total. En 2021, cette part était à peu près similaire (18 sur 176, soit 10,2 %).`,
		`Selon [un rapport du CNC de juin 2022](https://www.cnc.fr/documents/36995/1617915/Synth%C3%A8se+n%C2%B022+-+Les+films+d%E2%80%99initiative+fran%C3%A7aise+r%C3%A9alis%C3%A9s+par+des+femmes+en+2021.jpg/463de9fa-789b-e4e7-3dd7-6c237685c484?t=1655996607604), *moins de 30 % des films de fiction produits en 2021 avaient été réalisés ou coréalisés par des femmes*, une proportion en augmentation mais qui reste faible.`,
		`Sans compter que les réalisatrices sont en général bien moins dotées que leurs homologues masculins : *2,6 millions d'euros de budget en moyenne, contre 5 millions pour les réalisateurs*... ce qui peut expliquer la moindre visibilité de leurs films.`
	],
	topMovies: [
		{
			imdbId: 'tt9155512',
			quote: `« Si vous ne m’écoutez pas, voilà ce qui va se passer... »`,
			review: [
				'Huit ans que j’attendais (et appréhendais) le passage au grand écran de la meilleure web-série française.',
				'Pari réussi pour François Descraques, qui nous offre un premier film imparfait mais sincère, et d’une ambition rare dans le cinéma français.'
			]
		},
		{
			imdbId: 'tt1877830',
			quote: `“Vengeance won’t change the past, mine or anyone else’s. I have to become more.”`,
			review: [
				'Dans une année ponctuée de films Marvel et DC plus qu’oubliables, *The Batman* incarne un nouvel espoir pour le genre super-héroïque.',
				'Matt Reeves emprunte au cinéma de David Fincher pour nous livrer ce qui est assurément le film de comics le plus beau sorti ces dernières années.'
			]
		},
		{
			imdbId: 'tt20225374',
			quote: `“If a flower can change its purpose, so can I.”`,
			review: [
				'Coproduction franco-lituanienne à l’ambition folle, cette odyssée biopunk impressionne par la cohérence et la richesse visuelle de son univers post-apocalyptique.',
				'L’Europe a du talent !'
			]
		},
		{
			imdbId: 'tt9198364',
			quote: `“Love is a gift. It’s a gift of oneself given freely. It’s not something one can ever ask for.”`,
			review: `À travers cette réinterprétation des contes des Mille et Une Nuits, George Miller nous livre, avec son extravagance formelle habituelle, une ode à la puissance de la fiction.`
		},
		{
			imdbId: 'tt13729232',
			quote: `« La famille, c’est ce qu’il y a de pire au monde. C’est comme un poison qu’on a dans le sang. »`,
			review: [
				'La petite pépite du cinéma français de 2022.',
				'Sébastien Marnier réunit un casting féminin cinq étoiles et signe un thriller vénéneux aux multiples rebondissements et à la mise en scène inventive — avec notamment une utilisation novatrice du split-screen.'
			]
		},
		{
			imdbId: 'tt1630029',
			quote: `“I can’t save my family by running. This is our home. This is our fortress. This is where we make our stand.”`,
			review: [
				'Bien sûr, les images sont splendides et la prouesse technologique indiscutable.',
				'Mais avec cette suite, James Cameron entend surtout ressusciter un cinéma de divertissement en décrépitude — tout en dressant un constat amer sur l’urgence écologique qui pèse sur notre propre planète.'
			]
		},
		{
			imdbId: 'tt1488589',
			quote: `“What happens, happens. And then, we are gone.”`,
			review: [
				'Oubliez le remake Disney, LE Pinocchio de 2022 est signé Guillermo del Toro.',
				'Au-delà de l’animation sublime en stop motion, le déplacement de l’intrigue dans l’Italie fasciste transforme le conte de Collodi en ode poétique et politique à la désobéissance.',
				'J’ai eu la chance de rencontrer [Georgina Hayns, la créatrice des marionnettes du film](https://twitter.com/TomFevrier/status/1601160200769376258).'
			]
		},
		{
			imdbId: 'tt7270808',
			quote: `« Je vois le futur. Cette gamine et ces trois miséreux seront notre salut. »`,
			review: [
				'On reste dans l’Italie des années 40 avec ce petit bijou de Gabriele Mainetti, qui partage avec Del Toro cette passion pour les “freaks”, ces bêtes de foire laissées pour compte.',
				'Un véritable film de super-héros européen, d’une créativité et d’une ambition folle.'
			]
		},
		{
			imdbId: 'tt10954984',
			quote: `“See, every Friday, for the last six months, my family and I have bore witness to an absolute SPECTACLE.”`,
			review: 'En mêlant western et science-fiction — les deux genres américains par excellence —, Jordan Peele construit un récit horrifique maîtrisé aux multiples niveaux d’interprétation, sans jamais sacrifier le grand spectacle.'
		},
		{
			imdbId: 'tt6710474',
			quote: `“Here, all we get are a few specks of time where any of this actually makes any sense.”`,
			review: [
				'Le film de tous les superlatifs : le plus fou, le plus créatif, le plus drôle et le plus émouvant que j’aie jamais vu.',
				'Par leur patchwork syncrétique de références, leur constante inventivité visuelle et la candeur de leur discours, les Daniels s’inscrivent comme dignes héritiers des sœurs Wachowski et leur offrent le plus vibrant des hommages.',
				'Mais au-delà de l’originalité folle de ce multivers, qui n’a jamais été aussi bien traité au cinéma, *Everything Everywhere All at Once* touche en plein cœur en resserrant ses enjeux autour d’un sujet universel : une famille dysfonctionnelle qui doit réapprendre à communiquer.',
				'C’est aussi une œuvre, tout comme Inside de Bo Burnham (mon [top 3 de 2021](https://tomfevrier.io/retro-cinema-2021/)), qui a parfaitement compris son époque et a su capter cette fatigue informationnelle, cette perte de sens et ce sentiment d’impuissance face à l’absurdité du monde que nous sommes de plus en plus nombreux⋅ses à connaître.',
				'Pour tout connaître sur les inspirations des Daniels et les multiples références et symboles qui parsèment le long-métrage, [c’est par ici️ !](https://twitter.com/TomFevrier/status/1566458468248289286)'
			]
		}
	],
	masthead: [
		{
			title: 'Réalisation',
			content: 'Tom Février'
		},
		{
			title: 'Sources des données<br />et des images',
			content: '[TMDB](https://www.themoviedb.org)'
		},
		// {
		// 	content: [
		// 		`Merci aux *cinémas Pathé-Gaumont* : grâce à mon Cinépass, j'ai pu découvrir plus de films en salle cette année que les cinq années précédentes !`,
		// 		`Merci au *Club de l'Étoile*, le meilleur cinéma indépendant de Paris, et merci à *Victor Bonnefoy* pour tous ces "Unknown Movies".`,
		// 		`Et parce que le cinéma est un art qui se partage, merci à *toutes celles et ceux qui m'ont accompagné en salle* cette année : mes parents, Axel, Youssr, Vincent, Raphaëlle, Julien, Pauline, Damien et bien entendu Théo, mon fidèle acolyte cinéphile.`
		// 	]
		// }
	]
};

export default texts;