export const formatUrl = (url) => {
    return url.replace(/ /g, "-")
}
export const formatName = (url) => {
    return url.replace(/-/g, " ")
}