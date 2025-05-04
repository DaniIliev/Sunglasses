export const filterSunglasses = (sunglasses, filterValues) => {
    const isFilterEmpty = (
        filterValues.frameShapes.length === 0 &&
        filterValues.frameColor.length === 0 &&
        filterValues.lensType.length === 0 &&
        !filterValues.minPrice &&
        !filterValues.maxPrice &&
        filterValues.query.length === 0 &&
        filterValues.gender.length === 0)

    if (isFilterEmpty) return sunglasses;

    return sunglasses.filter(sunglass => {
        const shapeMatch = filterValues.frameShapes.length === 0 || filterValues.frameShapes.includes(sunglass.frameShape);
        const colorMatch = filterValues.frameColor.length === 0 || filterValues.frameColor.includes(sunglass.frameColor);
        const lensMatch = filterValues.lensType.length === 0 || filterValues.lensType.includes(sunglass.lensType);
        const priceMatch =
            (!filterValues.minPrice || sunglass.price >= filterValues.minPrice) &&
            (!filterValues.maxPrice || sunglass.price <= filterValues.maxPrice);
        const searchMatch =
            filterValues.query.length === 0 ||
            sunglass.name?.toLowerCase().includes(filterValues.query) ||
            sunglass.frameShape?.toLowerCase().includes(filterValues.query) ||
            sunglass.frameColor?.toLowerCase().includes(filterValues.query) ||
            sunglass.lensType?.toLowerCase().includes(filterValues.query);

        const genderMatch =
            filterValues.gender.length === 0 ||
            filterValues.gender.includes(sunglass.gender)
        return shapeMatch && colorMatch && lensMatch && priceMatch && searchMatch && genderMatch;
    });
};
