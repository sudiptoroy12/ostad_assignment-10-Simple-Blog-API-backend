const bloger = (req, res, next) => {
    console.log(`Request received for ${req.method} ${req.url}`);

    next();


}

export default bloger
