const countries = [
	{
		iso3: "AFG",
		iso2: "AF",
		nameFrench: "Afghanistan",
		name: "Afghanistan"
	},
	{
		iso3: "ZAF",
		iso2: "ZA",
		nameFrench: "Afrique du Sud",
		name: "South Africa"
	},
	{
		iso3: "ALB",
		iso2: "AL",
		nameFrench: "Albanie",
		name: "Albania"
	},
	{
		iso3: "DZA",
		iso2: "DZ",
		nameFrench: "Algérie",
		name: "Algeria"
	},
	{
		iso3: "DEU",
		iso2: "DE",
		nameFrench: "Allemagne",
		name: "Germany"
	},
	{
		nameFrench: "Allemagne de l'Ouest",
		name: "West Germany"
	},
	{
		iso3: "AND",
		iso2: "AD",
		nameFrench: "Andorre",
		name: "Andorra"
	},
	{
		iso3: "AGO",
		iso2: "AO",
		nameFrench: "Angola",
		name: "Angola"
	},
	{
		iso3: "ATG",
		iso2: "AG",
		nameFrench: "Antigua-et-Barbuda",
		name: "Antigua and Barbuda"
	},
	{
		iso3: "SAU",
		iso2: "SA",
		nameFrench: "Arabie saoudite",
		name: "Saudi Arabia"
	},
	{
		iso3: "ARG",
		iso2: "AR",
		nameFrench: "Argentine",
		name: "Argentina"
	},
	{
		iso3: "ARM",
		iso2: "AM",
		nameFrench: "Arménie",
		name: "Armenia"
	},
	{
		iso3: "AUS",
		iso2: "AU",
		nameFrench: "Australie",
		name: "Australia"
	},
	{
		iso3: "AUT",
		iso2: "AT",
		nameFrench: "Autriche",
		name: "Austria"
	},
	{
		iso3: "AZE",
		iso2: "AZ",
		nameFrench: "Azerbaïdjan",
		name: "Azerbaijan"
	},
	{
		iso3: "BHS",
		iso2: "BS",
		nameFrench: "Bahamas",
		name: "Bahamas"
	},
	{
		iso3: "BHR",
		iso2: "BH",
		nameFrench: "Bahreïn",
		name: "Bahrain"
	},
	{
		iso3: "BGD",
		iso2: "BD",
		nameFrench: "Bangladesh",
		name: "Bangladesh"
	},
	{
		iso3: "BRB",
		iso2: "BB",
		nameFrench: "Barbade",
		name: "Barbados"
	},
	{
		iso3: "BLR",
		iso2: "BY",
		nameFrench: "Biélorussie",
		name: "Belarus"
	},
	{
		iso3: "BEL",
		iso2: "BE",
		nameFrench: "Belgique",
		name: "Belgium"
	},
	{
		iso3: "BLZ",
		iso2: "BZ",
		nameFrench: "Belize",
		name: "Belize"
	},
	{
		iso3: "BEN",
		iso2: "BJ",
		nameFrench: "Bénin",
		name: "Benin"
	},
	{
		iso3: "BTN",
		iso2: "BT",
		nameFrench: "Bhoutan",
		name: "Bhutan"
	},
	{
		iso3: "BOL",
		iso2: "BO",
		nameFrench: "Bolivie",
		name: "Bolivia (Plurinational State of)"
	},
	{
		iso3: "BIH",
		iso2: "BA",
		nameFrench: "Bosnie-Herzégovine",
		name: "Bosnia and Herzegovina"
	},
	{
		iso3: "BWA",
		iso2: "BW",
		nameFrench: "Botswana",
		name: "Botswana"
	},
	{
		iso3: "BRA",
		iso2: "BR",
		nameFrench: "Brésil",
		name: "Brazil"
	},
	{
		iso3: "BRN",
		iso2: "BN",
		nameFrench: "Brunei",
		name: "Brunei Darussalam"
	},
	{
		iso3: "BGR",
		iso2: "BG",
		nameFrench: "Bulgarie",
		name: "Bulgaria"
	},
	{
		iso3: "BFA",
		iso2: "BF",
		nameFrench: "Burkina Faso",
		name: "Burkina Faso"
	},
	{
		iso3: "BDI",
		iso2: "BI",
		nameFrench: "Burundi",
		name: "Burundi"
	},
	{
		iso3: "KHM",
		iso2: "KH",
		nameFrench: "Cambodge",
		name: "Cambodia"
	},
	{
		iso3: "CMR",
		iso2: "CM",
		nameFrench: "Cameroun",
		name: "Cameroon"
	},
	{
		iso3: "CAN",
		iso2: "CA",
		nameFrench: "Canada",
		name: "Canada"
	},
	{
		iso3: "CPV",
		iso2: "CV",
		nameFrench: "Cap-Vert",
		name: "Cabo Verde"
	},
	{
		iso3: "CAF",
		iso2: "CF",
		nameFrench: "République centrafricaine",
		name: "Central African Republic"
	},
	{
		iso3: "CHL",
		iso2: "CL",
		nameFrench: "Chili",
		name: "Chile"
	},
	{
		iso3: "CHN",
		iso2: "CN",
		nameFrench: "Chine",
		name: "China"
	},
	{
		iso3: "CYP",
		iso2: "CY",
		nameFrench: "Chypre",
		name: "Cyprus"
	},
	{
		iso3: "COL",
		iso2: "CO",
		nameFrench: "Colombie",
		name: "Colombia"
	},
	{
		iso3: "COM",
		iso2: "KM",
		nameFrench: "Comores",
		name: "Comoros"
	},
	{
		iso3: "COG",
		iso2: "CG",
		nameFrench: "République du Congo",
		name: "Congo"
	},
	{
		iso3: "COD",
		iso2: "CD",
		nameFrench: "République démocratique du Congo",
		name: "Congo, Democratic Republic of the"
	},
	{
		iso3: "KOR",
		iso2: "KR",
		nameFrench: "Corée du Sud",
		name: "Korea, Republic of"
	},
	{
		iso3: "PRK",
		iso2: "KP",
		nameFrench: "Corée du Nord",
		name: "Korea (Democratic People's Republic of)"
	},
	{
		iso3: "CRI",
		iso2: "CR",
		nameFrench: "Costa Rica",
		name: "Costa Rica"
	},
	{
		iso3: "CIV",
		iso2: "CI",
		nameFrench: "Côte d’Ivoire",
		name: "Côte d'Ivoire"
	},
	{
		iso3: "HRV",
		iso2: "HR",
		nameFrench: "Croatie",
		name: "Croatia"
	},
	{
		iso3: "CUB",
		iso2: "CU",
		nameFrench: "Cuba",
		name: "Cuba"
	},
	{
		iso3: "DNK",
		iso2: "DK",
		nameFrench: "Danemark",
		name: "Denmark"
	},
	{
		iso3: "DJI",
		iso2: "DJ",
		nameFrench: "Djibouti",
		name: "Djibouti"
	},
	{
		iso3: "DOM",
		iso2: "DO",
		nameFrench: "République dominicaine",
		name: "Dominican Republic"
	},
	{
		iso3: "DMA",
		iso2: "DM",
		nameFrench: "Dominique",
		name: "Dominica"
	},
	{
		iso3: "EGY",
		iso2: "EG",
		nameFrench: "Égypte",
		name: "Egypt"
	},
	{
		iso3: "SLV",
		iso2: "SV",
		nameFrench: "Salvador",
		name: "El Salvador"
	},
	{
		iso3: "ARE",
		iso2: "AE",
		nameFrench: "Émirats arabes unis",
		name: "United Arab Emirates"
	},
	{
		iso3: "ECU",
		iso2: "EC",
		nameFrench: "Équateur",
		name: "Ecuador"
	},
	{
		iso3: "ERI",
		iso2: "ER",
		nameFrench: "Érythrée",
		name: "Eritrea"
	},
	{
		iso3: "ESP",
		iso2: "ES",
		nameFrench: "Espagne",
		name: "Spain"
	},
	{
		iso3: "EST",
		iso2: "EE",
		nameFrench: "Estonie",
		name: "Estonia"
	},
	{
		iso3: "USA",
		iso2: "US",
		nameFrench: "États-Unis",
		name: "United States"
	},
	{
		iso3: "USA",
		iso2: "US",
		nameFrench: "États-Unis",
		name: "USA"
	},
	{
		iso3: "ETH",
		iso2: "ET",
		nameFrench: "Éthiopie",
		name: "Ethiopia"
	},
	{
		iso3: "FJI",
		iso2: "FJ",
		nameFrench: "Fidji",
		name: "Fiji"
	},
	{
		iso3: "FIN",
		iso2: "FI",
		nameFrench: "Finlande",
		name: "Finland"
	},
	{
		iso3: "FRA",
		iso2: "FR",
		nameFrench: "France",
		name: "France"
	},
	{
		iso3: "GAB",
		iso2: "GA",
		nameFrench: "Gabon",
		name: "Gabon"
	},
	{
		iso3: "GMB",
		iso2: "GM",
		nameFrench: "Gambie",
		name: "Gambia"
	},
	{
		iso3: "GEO",
		iso2: "GE",
		nameFrench: "Géorgie",
		name: "Georgia"
	},
	{
		iso3: "GHA",
		iso2: "GH",
		nameFrench: "Ghana",
		name: "Ghana"
	},
	{
		iso3: "GRC",
		iso2: "GR",
		nameFrench: "Grèce",
		name: "Greece"
	},
	{
		iso3: "GRD",
		iso2: "GD",
		nameFrench: "Grenade",
		name: "Grenada"
	},
	{
		iso3: "GTM",
		iso2: "GT",
		nameFrench: "Guatemala",
		name: "Guatemala"
	},
	{
		iso3: "GIN",
		iso2: "GN",
		nameFrench: "Guinée",
		name: "Guinea"
	},
	{
		iso3: "GNB",
		iso2: "GW",
		nameFrench: "Guinée-Bissau",
		name: "Guinea-Bissau"
	},
	{
		iso3: "GNQ",
		iso2: "GQ",
		nameFrench: "Guinée équatoriale",
		name: "Equatorial Guinea"
	},
	{
		iso3: "GUY",
		iso2: "GY",
		nameFrench: "Guyana",
		name: "Guyana"
	},
	{
		iso3: "HTI",
		iso2: "HT",
		nameFrench: "Haïti",
		name: "Haiti"
	},
	{
		iso3: "HND",
		iso2: "HN",
		nameFrench: "Honduras",
		name: "Honduras"
	},
	{
		iso3: "HKG",
		iso2: "HK",
		nameFrench: "Hong Kong",
		name: "Hong Kong"
	},
	{
		iso3: "HUN",
		iso2: "HU",
		nameFrench: "Hongrie",
		name: "Hungary"
	},
	{
		iso3: "IND",
		iso2: "IN",
		nameFrench: "Inde",
		name: "India"
	},
	{
		iso3: "IDN",
		iso2: "ID",
		nameFrench: "Indonésie",
		name: "Indonesia"
	},
	{
		iso3: "IRN",
		iso2: "IR",
		nameFrench: "Iran",
		name: "Iran (Islamic Republic of)"
	},
	{
		iso3: "IRQ",
		iso2: "IQ",
		nameFrench: "Irak",
		name: "Iraq"
	},
	{
		iso3: "IRL",
		iso2: "IE",
		nameFrench: "Irlande",
		name: "Ireland"
	},
	{
		iso3: "ISL",
		iso2: "IS",
		nameFrench: "Islande",
		name: "Iceland"
	},
	{
		iso3: "ISR",
		iso2: "IL",
		nameFrench: "Israël",
		name: "Israel"
	},
	{
		iso3: "ITA",
		iso2: "IT",
		nameFrench: "Italie",
		name: "Italy"
	},
	{
		iso3: "JAM",
		iso2: "JM",
		nameFrench: "Jamaïque",
		name: "Jamaica"
	},
	{
		iso3: "JPN",
		iso2: "JP",
		nameFrench: "Japon",
		name: "Japan"
	},
	{
		iso3: "JOR",
		iso2: "JO",
		nameFrench: "Jordanie",
		name: "Jordan"
	},
	{
		iso3: "KAZ",
		iso2: "KZ",
		nameFrench: "Kazakhstan",
		name: "Kazakhstan"
	},
	{
		iso3: "KEN",
		iso2: "KE",
		nameFrench: "Kenya",
		name: "Kenya"
	},
	{
		iso3: "KGZ",
		iso2: "KG",
		nameFrench: "Kirghizistan",
		name: "Kyrgyzstan"
	},
	{
		iso3: "KIR",
		iso2: "KI",
		nameFrench: "Kiribati",
		name: "Kiribati"
	},
	{
		iso3: "KWT",
		iso2: "KW",
		nameFrench: "Koweït",
		name: "Kuwait"
	},
	{
		iso3: "LAO",
		iso2: "LA",
		nameFrench: "Laos",
		name: "Lao People's Democratic Republic"
	},
	{
		iso3: "LSO",
		iso2: "LS",
		nameFrench: "Lesotho",
		name: "Lesotho"
	},
	{
		iso3: "LVA",
		iso2: "LV",
		nameFrench: "Lettonie",
		name: "Latvia"
	},
	{
		iso3: "LBN",
		iso2: "LB",
		nameFrench: "Liban",
		name: "Lebanon"
	},
	{
		iso3: "LBR",
		iso2: "LR",
		nameFrench: "Liberia",
		name: "Liberia"
	},
	{
		iso3: "LBY",
		iso2: "LY",
		nameFrench: "Libye",
		name: "Libya"
	},
	{
		iso3: "LIE",
		iso2: "LI",
		nameFrench: "Liechtenstein",
		name: "Liechtenstein"
	},
	{
		iso3: "LTU",
		iso2: "LT",
		nameFrench: "Lituanie",
		name: "Lithuania"
	},
	{
		iso3: "LUX",
		iso2: "LU",
		nameFrench: "Luxembourg",
		name: "Luxembourg"
	},
	{
		iso3: "MKD",
		iso2: "MK",
		nameFrench: "Macédoine du Nord",
		name: "North Macedonia"
	},
	{
		iso3: "MDG",
		iso2: "MG",
		nameFrench: "Madagascar",
		name: "Madagascar"
	},
	{
		iso3: "MYS",
		iso2: "MY",
		nameFrench: "Malaisie",
		name: "Malaysia"
	},
	{
		iso3: "MWI",
		iso2: "MW",
		nameFrench: "Malawi",
		name: "Malawi"
	},
	{
		iso3: "MDV",
		iso2: "MV",
		nameFrench: "Maldives",
		name: "Maldives"
	},
	{
		iso3: "MLI",
		iso2: "ML",
		nameFrench: "Mali",
		name: "Mali"
	},
	{
		iso3: "MLT",
		iso2: "MT",
		nameFrench: "Malte",
		name: "Malta"
	},
	{
		iso3: "MAR",
		iso2: "MA",
		nameFrench: "Maroc",
		name: "Morocco"
	},
	{
		iso3: "MHL",
		iso2: "MH",
		nameFrench: "Îles Marshall",
		name: "Marshall Islands"
	},
	{
		iso3: "MUS",
		iso2: "MU",
		nameFrench: "Maurice",
		name: "Mauritius"
	},
	{
		iso3: "MRT",
		iso2: "MR",
		nameFrench: "Mauritanie",
		name: "Mauritania"
	},
	{
		iso3: "MEX",
		iso2: "MX",
		nameFrench: "Mexique",
		name: "Mexico"
	},
	{
		iso3: "FSM",
		iso2: "FM",
		nameFrench: "États fédérés de Micronésie",
		name: "Micronesia (Federated States of)"
	},
	{
		iso3: "MDA",
		iso2: "MD",
		nameFrench: "Moldavie",
		name: "Moldova, Republic of"
	},
	{
		iso3: "MCO",
		iso2: "MC",
		nameFrench: "Monaco",
		name: "Monaco"
	},
	{
		iso3: "MNG",
		iso2: "MN",
		nameFrench: "Mongolie",
		name: "Mongolia"
	},
	{
		iso3: "MNE",
		iso2: "ME",
		nameFrench: "Monténégro",
		name: "Montenegro"
	},
	{
		iso3: "MOZ",
		iso2: "MZ",
		nameFrench: "Mozambique",
		name: "Mozambique"
	},
	{
		iso3: "MMR",
		iso2: "MM",
		nameFrench: "Birmanie",
		name: "Myanmar"
	},
	{
		iso3: "NAM",
		iso2: "NA",
		nameFrench: "Namibie",
		name: "Namibia"
	},
	{
		iso3: "NRU",
		iso2: "NR",
		nameFrench: "Nauru",
		name: "Nauru"
	},
	{
		iso3: "NPL",
		iso2: "NP",
		nameFrench: "Népal",
		name: "Nepal"
	},
	{
		iso3: "NIC",
		iso2: "NI",
		nameFrench: "Nicaragua",
		name: "Nicaragua"
	},
	{
		iso3: "NER",
		iso2: "NE",
		nameFrench: "Niger",
		name: "Niger"
	},
	{
		iso3: "NGA",
		iso2: "NG",
		nameFrench: "Nigeria",
		name: "Nigeria"
	},
	{
		iso3: "NOR",
		iso2: "NO",
		nameFrench: "Norvège",
		name: "Norway"
	},
	{
		iso3: "NZL",
		iso2: "NZ",
		nameFrench: "Nouvelle-Zélande",
		name: "New Zealand"
	},
	{
		iso3: "OMN",
		iso2: "OM",
		nameFrench: "Oman",
		name: "Oman"
	},
	{
		iso3: "UGA",
		iso2: "UG",
		nameFrench: "Ouganda",
		name: "Uganda"
	},
	{
		iso3: "UZB",
		iso2: "UZ",
		nameFrench: "Ouzbékistan",
		name: "Uzbekistan"
	},
	{
		iso3: "PAK",
		iso2: "PK",
		nameFrench: "Pakistan",
		name: "Pakistan"
	},
	{
		iso3: "PLW",
		iso2: "PW",
		nameFrench: "Palaos",
		name: "Palau"
	},
	{
		iso3: "PSE",
		iso2: "PS",
		nameFrench: "Palestine",
		name: "Palestine, State of"
	},
	{
		iso3: "PAN",
		iso2: "PA",
		nameFrench: "Panama",
		name: "Panama"
	},
	{
		iso3: "PNG",
		iso2: "PG",
		nameFrench: "Papouasie-Nouvelle-Guinée",
		name: "Papua New Guinea"
	},
	{
		iso3: "PRY",
		iso2: "PY",
		nameFrench: "Paraguay",
		name: "Paraguay"
	},
	{
		iso3: "NLD",
		iso2: "NL",
		nameFrench: "Pays-Bas",
		name: "Netherlands"
	},
	{
		iso3: "PER",
		iso2: "PE",
		nameFrench: "Pérou",
		name: "Peru"
	},
	{
		iso3: "PHL",
		iso2: "PH",
		nameFrench: "Philippines",
		name: "Philippines"
	},
	{
		iso3: "POL",
		iso2: "PL",
		nameFrench: "Pologne",
		name: "Poland"
	},
	{
		iso3: "PRT",
		iso2: "PT",
		nameFrench: "Portugal",
		name: "Portugal"
	},
	{
		iso3: "QAT",
		iso2: "QA",
		nameFrench: "Qatar",
		name: "Qatar"
	},
	{
		iso3: "ROU",
		iso2: "RO",
		nameFrench: "Roumanie",
		name: "Romania"
	},
	{
		iso3: "GBR",
		iso2: "GB",
		nameFrench: "Royaume-Uni",
		name: "United Kingdom"
	},
	{
		iso3: "RUS",
		iso2: "RU",
		nameFrench: "Russie",
		name: "Russia"
	},
	{
		iso3: "RWA",
		iso2: "RW",
		nameFrench: "Rwanda",
		name: "Rwanda"
	},
	{
		iso3: "KNA",
		iso2: "KN",
		nameFrench: "Saint-Christophe-et-Niévès",
		name: "Saint Kitts and Nevis"
	},
	{
		iso3: "SMR",
		iso2: "SM",
		nameFrench: "Saint-Marin",
		name: "San Marino"
	},
	{
		iso3: "VAT",
		iso2: "VA",
		nameFrench: "Saint-Siège",
		name: "Holy See"
	},
	{
		iso3: "VCT",
		iso2: "VC",
		nameFrench: "Saint-Vincent-et-les-Grenadines",
		name: "Saint Vincent and the Grenadines"
	},
	{
		iso3: "LCA",
		iso2: "LC",
		nameFrench: "Sainte-Lucie",
		name: "Saint Lucia"
	},
	{
		iso3: "SLB",
		iso2: "SB",
		nameFrench: "Îles Salomon",
		name: "Solomon Islands"
	},
	{
		iso3: "WSM",
		iso2: "WS",
		nameFrench: "Samoa",
		name: "Samoa"
	},
	{
		iso3: "STP",
		iso2: "ST",
		nameFrench: "Sao Tomé-et-Principe",
		name: "Sao Tome and Principe"
	},
	{
		iso3: "SEN",
		iso2: "SN",
		nameFrench: "Sénégal",
		name: "Senegal"
	},
	{
		iso3: "SRB",
		iso2: "RS",
		nameFrench: "Serbie",
		name: "Serbia"
	},
	{
		iso3: "SYC",
		iso2: "SC",
		nameFrench: "Seychelles",
		name: "Seychelles"
	},
	{
		iso3: "SLE",
		iso2: "SL",
		nameFrench: "Sierra Leone",
		name: "Sierra Leone"
	},
	{
		iso3: "SGP",
		iso2: "SG",
		nameFrench: "Singapour",
		name: "Singapore"
	},
	{
		iso3: "SVK",
		iso2: "SK",
		nameFrench: "Slovaquie",
		name: "Slovakia"
	},
	{
		iso3: "SVN",
		iso2: "SI",
		nameFrench: "Slovénie",
		name: "Slovenia"
	},
	{
		iso3: "SOM",
		iso2: "SO",
		nameFrench: "Somalie",
		name: "Somalia"
	},
	{
		iso3: "SDN",
		iso2: "SD",
		nameFrench: "Soudan",
		name: "Sudan"
	},
	{
		iso3: "SSD",
		iso2: "SS",
		nameFrench: "Soudan du Sud",
		name: "South Sudan"
	},
	{
		iso3: "LKA",
		iso2: "LK",
		nameFrench: "Sri Lanka",
		name: "Sri Lanka"
	},
	{
		iso3: "SWE",
		iso2: "SE",
		nameFrench: "Suède",
		name: "Sweden"
	},
	{
		iso3: "CHE",
		iso2: "CH",
		nameFrench: "Suisse",
		name: "Switzerland"
	},
	{
		iso3: "SUR",
		iso2: "SR",
		nameFrench: "Suriname",
		name: "Suriname"
	},
	{
		iso3: "SWZ",
		iso2: "SZ",
		nameFrench: "Eswatini",
		name: "Eswatini"
	},
	{
		iso3: "SYR",
		iso2: "SY",
		nameFrench: "Syrie",
		name: "Syrian Arab Republic"
	},
	{
		iso3: "TJK",
		iso2: "TJ",
		nameFrench: "Tadjikistan",
		name: "Tajikistan"
	},
	{
		iso3: "TZA",
		iso2: "TZ",
		nameFrench: "Tanzanie",
		name: "Tanzania, United Republic of"
	},
	{
		iso3: "TCD",
		iso2: "TD",
		nameFrench: "Tchad",
		name: "Chad"
	},
	{
		iso3: "CZE",
		iso2: "CZ",
		nameFrench: "Tchéquie",
		name: "Czechia"
	},
	{
		iso3: "THA",
		iso2: "TH",
		nameFrench: "Thaïlande",
		name: "Thailand"
	},
	{
		iso3: "TLS",
		iso2: "TL",
		nameFrench: "Timor oriental",
		name: "Timor-Leste"
	},
	{
		iso3: "TGO",
		iso2: "TG",
		nameFrench: "Togo",
		name: "Togo"
	},
	{
		iso3: "TON",
		iso2: "TO",
		nameFrench: "Tonga",
		name: "Tonga"
	},
	{
		iso3: "TTO",
		iso2: "TT",
		nameFrench: "Trinité-et-Tobago",
		name: "Trinidad and Tobago"
	},
	{
		iso3: "TUN",
		iso2: "TN",
		nameFrench: "Tunisie",
		name: "Tunisia"
	},
	{
		iso3: "TKM",
		iso2: "TM",
		nameFrench: "Turkménistan",
		name: "Turkmenistan"
	},
	{
		iso3: "TUR",
		iso2: "TR",
		nameFrench: "Turquie",
		name: "Turkey"
	},
	{
		iso3: "TUV",
		iso2: "TV",
		nameFrench: "Tuvalu",
		name: "Tuvalu"
	},
	{
		iso3: "TWN",
		iso2: "TW",
		nameFrench: "Taïwan",
		name: "Taiwan"
	},
	{
		iso3: "UKR",
		iso2: "UA",
		nameFrench: "Ukraine",
		name: "Ukraine"
	},
	{
		iso3: "URY",
		iso2: "UY",
		nameFrench: "Uruguay",
		name: "Uruguay"
	},
	{
		iso3: "VUT",
		iso2: "VU",
		nameFrench: "Vanuatu",
		name: "Vanuatu"
	},
	{
		iso3: "VEN",
		iso2: "VE",
		nameFrench: "Venezuela",
		name: "Venezuela (Bolivarian Republic of)"
	},
	{
		iso3: "VNM",
		iso2: "VN",
		nameFrench: "Viêt Nam",
		name: "Viet Nam"
	},
	{
		iso3: "YEM",
		iso2: "YE",
		nameFrench: "Yémen",
		name: "Yemen"
	},
	{
		iso3: "ZMB",
		iso2: "ZM",
		nameFrench: "Zambie",
		name: "Zambia"
	},
	{
		iso3: "ZWE",
		iso2: "ZW",
		nameFrench: "Zimbabwe",
		name: "Zimbabwe"
	}
];

export default new Map(countries.map(e => [e.nameFrench, e.iso3]));