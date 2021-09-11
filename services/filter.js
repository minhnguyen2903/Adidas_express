const ConvertString = require("./StringToArr");

const Filter = (query) => {
    const queryKey = {
        title: "%%",
        subtitle: "%%",
        category: "%%",
        color: "%%",
    };
    const defaultQueryKey = {
        title: "",
        subtitle: [
            "men", "women", "kid",
            "originals",
            "football",
            "running",
            "sprots inspired",
            "outdoor",
            "basketball",
            "slides",
            "tennis",
        ],
        category: ["clothing", "shoes", "accessories", "clothes"],
        color: ["black", "white", "red", "blue"]
    };
    const queryQ = ConvertString(query.q || "");
    queryQ.forEach(element => {
        let isTitle = true;
        Object.keys(defaultQueryKey).forEach(key => {
            if(defaultQueryKey[key].includes(element)) {
                queryKey[key] = `%${element}%`;
                isTitle = false
            }
        })
        if(isTitle) {
            queryKey.title = `%${element}%`
        }
    })
    if (query.gender !== undefined) {
        queryKey.subtitle = `%${query.gender}%`;
    }
    if (query.division !== undefined) {
        queryKey.category = `%${query.division}%`;
    }
    if (query.sports !== undefined) {
        queryKey.subtitle = `%${query.sports}%`;
    }
    if (query.brand !== undefined) {
        queryKey.subtitle = `%${query.brand}%`;
    }
    if (query.colour !== undefined) {
        queryKey.color = `%${query.colour}%`;
    }
    return queryKey
};

module.exports = Filter;
