const texts = {
	grid: {
		all: [
			`*{{ TOTAL_TIME }}*. C'est le temps que j'ai passé l'année dernière à regarder des films, que ce soit chez moi ou au cinéma.`,
			`Cela représente *{{ NB_MOVIES }} longs-métrages*, sortis entre {{ OLDEST_RELEASE }} et 2022 et venant des quatre coins du monde : des États-Unis à la Norvège, en passant par la France, le Japon et la Russie.`
		],
		theater: `Depuis la réouverture des cinémas le 19 mai 2021, je suis allé voir *{{ NB_MOVIES_THEATER }} films à l'affiche en salle*... certains même plusieurs fois. Autant dire que mon passe illimité Pathé-Gaumont a vite été rentabilisé !`,
		festival: `J'ai eu la chance de découvrir plusieurs de ces films au cours de festivals. L'*Arras Film Festival* du 11 au 14 novembre dernier, ou le festival queer *Chéries Chéris* les 27 et 28 novembre à Paris.`,
		home: `J'ai également découvert *{{ NB_MOVIES_HOME }} films sortis l'année dernière chez moi*. Que ce soit sur Netflix, Amazon Prime, myCanal... ou par des moyens pas vraiment légaux.`,
		top: `Parmi tous ces films sortis en 2022, *voici mes 10 préférés*. Retrouvez le classement et mon avis rapide sur chacun d'entre eux tout en bas de cette page.`,
		rewatch: [
			`_“Nothing comforts anxiety like a little nostalgia.”_ Cette réplique de Morpheus dans *Matrix Resurrections* pourrait totalement s'appliquer à moi, avec *{{ NB_MOVIES_REWATCH }} films revus* l'année dernière.`,
			`Certains au cinéma et pour la première fois, comme *Cloud Atlas* ou la trilogie *Indiana Jones*.`
		],
		discovery: [
			`Mais 2021 a surtout été pour moi une année de découverte, avec *{{ NB_MOVIES_DISCOVERY }} films que je n'avais jamais vus*.`,
			`Dont certains "classiques" comme *La petite boutique des horreurs*, *Chérie, j'ai rétréci les gosses*, *West Side Story (1961)* ou *Le silence des agneaux*.`
		],
		spielberg: [
			`Parmi ces revisionnages et ces découvertes, {{ NB_MOVIES_SPIELBERG }} films de Steven Spielberg, dont je tente de rattraper l’ensemble de la filmographie (presque) dans l’ordre, d’ici la sortie de *The Fabelmans* le 22 février 2023.`
		],
		clubEtoile: [
			`En 2022, j’ai encore passé beaucoup de temps sur les fauteuils de mon cinéma fétiche, le Club de l’Étoile... {{ TIME_CLUB_ETOILE }} exactement.`,
			`Je me suis laissé surprendre par des films plus ou moins étranges lors des séances Unknown Movies, et j’ai aussi pu revoir la *trilogie Cornetto* sur grand écran, subir la propagande d’un film de guerre chinois, ou bien encore découvrir les controversés *Event Horizon* et *Le Seigneur des Anneaux* version animée.`,
		]
	},
	watchDate: [
		`Voici le temps que j'ai passé, *jour par jour*, à regarder des films en 2021. On remarque une accélération à partir de l'été, s'expliquant par la réouverture des cinémas d'une part, et par la fin de mes études d'autre part.`,
		`Également visibles : mon rattrapage des cinq James Bond de Daniel Craig en amont de ma séance de *Mourir peut attendre*, du 7 au 10 octobre, et le marathon de la trilogie *Indiana Jones* au Grand Rex le 23 octobre.`
	],
	releaseDate: [
		`Sans surprise au vu de ma génération, plus de 80 % des films que j'ai regardés l'année dernière sont sortis après l'an 2000, et *près de la moitié en 2020 ou 2021*.`,
		`Je tâcherai cette année de découvrir plus de cinéma dit "de patrimoine". En profitant de rétrospectives en salle, peut-être ?`
	],
	medium: [
		`Malgré leur fermeture pendant près de six mois, j'aurai passé *un peu moins de six jours dans une salle de cinéma* en 2021 - meilleures conditions pour découvrir un film.`,
		`Avec la multiplication des plateformes de SVOD, il est parfois difficile de mettre la main sur une œuvre sans devoir cumuler de coûteux abonnements. C'est pour cela qu'en parallèle de *Netflix*, j'ai aussi vu *beaucoup de films téléchargés illégalement*... ce qui m'a d'ailleurs valu mon premier avertissement d'Hadopi !`
	],
	originCountry: [
		`En 2021, j'aurai vu des films provenant de *{{ NB_COUNTRIES }} pays différents*, dont je n'avais parfois vu aucun film auparavant - la Pologne, l'Estonie ou l'Algérie, par exemple.`,
		`Mais ne nous mentons pas : plus de la moitié des films sont américains, et près d'un sur cinq est français. *Plus de diversité en 2022 ?*`
	],
	genres: [
		`Outre les genres courants (comédie, drame, action, aventure), les films que j'ai vus cette année trahissent mes goûts en terme de cinéma.`,
		`On trouve ainsi *un grand nombre de longs-métrages de genre* (horreur, thriller, science-fiction & fantastique), dont beaucoup de films français de l'année : *Le dernier voyage*, *La Nuée*, *Teddy*, *Oxygène*, *Titane*, etc.`,
		`On recense également un certain nombre de *comédies musicales* : *Annette*, les deux adaptations de *West Side Story*, mais aussi *D'où l'on vient*, *tick, tick... Boom!* ou *Encanto*. Décidément, 2021 est l'année de ma rencontre avec Lin-Manuel Miranda !`
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
				'La petite pépite du cinéma français de cette année.',
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
		{
			content: [
				`Merci aux *cinémas Pathé-Gaumont* : grâce à mon Cinépass, j'ai pu découvrir plus de films en salle cette année que les cinq années précédentes !`,
				`Merci au *Club de l'Étoile*, le meilleur cinéma indépendant de Paris, et merci à *Victor Bonnefoy* pour tous ces "Unknown Movies".`,
				`Et parce que le cinéma est un art qui se partage, merci à *toutes celles et ceux qui m'ont accompagné en salle* cette année : mes parents, Axel, Youssr, Vincent, Raphaëlle, Julien, Pauline, Damien et bien entendu Théo, mon fidèle acolyte cinéphile.`
			]
		}
	]
};

export default texts;