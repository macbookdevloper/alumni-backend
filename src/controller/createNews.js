const NewsDetail = require('../model/newsModel');

const createNews = async (req, res) => {
    
    try {
        const newsImagePath = req.file ? req.file.path : null;
        const { newsTitle, newsContent, adminID } = req.body;

        // Validate required fields
        if (!newsTitle || !newsContent || !adminID) {
            return res.status(400).json({
                success: false,
                message: 'News title, content, and admin ID are required.'
            });
        }
        const news = new NewsDetail({
            newsTitle,
            newsContent,
            newsimage: newsImagePath,
            adminID
        });
        await news.save();
        console.log("News API is called succesfully.");
        return res.status(200).json({
            success: true,
            message: 'News is Greate Succesfully.',
            data: news
        });
        

    } catch (error) {
        return res.status(500).json({
            error: console.log(error),
            success: false,
            message: 'An error occurred while adding the news.'
        });
    }
}

module.exports = {
    createNews
}