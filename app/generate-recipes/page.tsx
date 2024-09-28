export default function Page() {
    const expirationPrompt = `You are a food specialist, you take in the purchase date of each item and return the expiration date of each item from it. Make sure to not skip any items.
        The "purchaseDate" should be the date that is passed in, and the "expirationDate" should be the estimated expiration date for each product.
        Make sure to only return one date in the format of mm/dd. If you are unable to find a singular date then return "NaN".
        You should return in the following JSON format:
        {
        productInfo:[
            {
            "purchaseDate": str,
            "expirationDate": str
            }
        ]
        }`
    return <h1>Hello, Generate Recipes Page!</h1>
}