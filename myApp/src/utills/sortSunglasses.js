export const sortSunglasses = (sunglasses, sortType) => {
    let sortedSunglasses = [...sunglasses];

    if (sortType === 'ascending') {
        return sortedSunglasses.sort((a, b) => a.price - b.price);
    } else if (sortType === 'descending') {
        return sortedSunglasses.sort((a, b) => b.price - a.price);
    } else if (sortType === "newest") {
        return sortedSunglasses.sort((a, b) => a.createdAt - b.createdAt);
    }
    
    return sortedSunglasses;
};
