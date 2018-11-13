
export const analyzers= {
    Si : { key:"Si",  index: 1, a: 5.4307 },
    Ge: { key:"Ge", index: 2, a: 5.658 },
    Quarz: { key:"Quarz", index: 3 },
};

export const reflections= {
    Si111 : { key:"Si111", crystal: analyzers.Si, h: 1, k: 1, l: 1, main: True },
    Si333 : { key:"Si333", crystal: analyzers.Si, h: 3, k: 3, l: 3, main: False },
    Si444 : { key:"Si444", crystal: analyzers.Si, h: 4, k: 4, l: 4, main: False },
    Si555 : { key:"Si555", crystal: analyzers.Si, h: 5, k: 5, l: 5, main: False },
    Si777 : { key:"Si777", crystal: analyzers.Si, h: 7, k: 7, l: 7, main: False },
    Si888 : { key:"Si888", crystal: analyzers.Si, h: 8, k: 8, l: 8, main: False },
    Si999 : { key:"Si999", crystal: analyzers.Si, h: 9, k: 9, l: 9, main: False },

    Si220 : { key:"Si220", crystal: analyzers.Si, h: 2, k: 2, l: 0, main: True },
    Si440 : { key:"Si440", crystal: analyzers.Si, h: 4, k: 4, l: 0, main: False },
    Si660 : { key:"Si660", crystal: analyzers.Si, h: 6, k: 6, l: 0, main: False },
    Si880 : { key:"Si880", crystal: analyzers.Si, h: 8, k: 8, l: 0, main: False },

    Si400 : { key:"Si400", crystal: analyzers.Si, h: 4, k: 0, l: 0, main: True },
    Si800 : { key:"Si800", crystal: analyzers.Si, h: 8, k: 0, l: 0, main: False },

    Si311 : { key:"Si311", crystal: analyzers.Si, h: 3, k: 1, l: 1, main: True },
    Si933 : { key:"Si933", crystal: analyzers.Si, h: 9, k: 3, l: 3, main: False },

    Si331 : { key:"Si331", crystal: analyzers.Si, h: 3, k: 3, l: 1, main: True },
    Si331 : { key:"Si331", crystal: analyzers.Si, h: 3, k: 3, l: 1, main: False },

    Si531 : { key:"Si531", crystal: analyzers.Si, h: 5, k: 3, l: 1,  main: True },

    Si553 : { key:"Si553", crystal: analyzers.Si, h: 5, k: 5, l: 3, main: True },


    Ge111 : { key:"Ge111", crystal: analyzers.Ge, h: 1, k: 1, l: 1 },
    Ge333 : { key:"Ge333", crystal: analyzers.Ge, h: 3, k: 3, l: 3 },
    Ge444 : { key:"Ge444", crystal: analyzers.Ge, h: 4, k: 4, l: 4 },
    Ge555 : { key:"Ge555", crystal: analyzers.Ge, h: 5, k: 5, l: 5 },
    Ge777 : { key:"Ge777", crystal: analyzers.Ge, h: 7, k: 7, l: 7 },
    Ge888 : { key:"Ge888", crystal: analyzers.Ge, h: 8, k: 8, l: 8 },
    Ge999 : { key:"Ge999", crystal: analyzers.Ge, h: 9, k: 9, l: 9 },

    Quarz: { key:"Quarz", index: 3 },
};
