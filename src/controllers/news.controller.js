import { createServiceNews, 
         findAllServiceNews, 
         countNews, 
         topNewsService, 
         findByIdService,
         searchByTitleService,
        searchByUserService,
        updateNewsService,
        deleteNewsService, 
        likeNewsService,
        deleteLikeNewsService} from "../services/news.service.js";

import {ObjectId} from "mongoose";


const createNews = async (req, res) =>  {
    try{

       const {title, text, banner} =  req.body; 

       if (!title || !text || !banner) {
        res.status(400).send({message: "Submit all fields for registration"});
       }

       await createServiceNews(
        {
            title,
            text,
            banner,
            user: req.userId
        }
       );
       res.send(201); 
    }
    catch (err) {
        res.status(500).json({message: err.message});
    };
};

const findAllNews = async (req, res) => {
    try {

        let {limit, offset} = req.query;
        limit = Number(limit);
        offset = Number(offset);

        if (!limit)
        {
            limit = 5;
        }

        if (!offset)
        {
            offset = 0;
        }

        const news = await findAllServiceNews(offset, limit);
        const total = await countNews();
        const currentURL = req.baseUrl

        const next = offset + limit;
        const nextURL = next < total ? `${currentURL}?limit=${limit}&offset=${next}`: null; 
        const preview = offset - limit < 0 ? null : offset - limit;
        const previewURL = preview !== null ? `${currentURL}?limit=${limit}&offset=${preview}` : null; 

        if (news.length === 0) {
            return res.status(400).json({message:"No news found"});
        }
        res.send({
            nextURL,
            previewURL, 
            limit,
            offset,
            total,

            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                userName: item.user.username,
                userAvatar: item.user.avatar

            }))
        });
    }
    catch (err) {
        res.status(500).json({message: err.message});
    };
};

const topNews = async (req, res) => {
    try {
       const news = await topNewsService();
        if (!news)
        {
            return res.status(400).send({message: "No news found"});
        }
        res.send({ news:
            {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                userName: news.user.username,
                userAvatar: news.user.avatar
            }
    });
    }
    catch (err) {
        res.status(500).json({message: err.message});
    };
};

const findById = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await findByIdService(id); 
        if (!news)
        {
            return res.status(400).send({message: "No news found"});
        }
        res.send({ news:
            {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                userName: news.user.username,
                userAvatar: news.user.avatar
            }
    });
  }
    catch (err) {
        res.status(500).json({message: err.message});
    };

};


const searchByTitle = async (req, res) => {
    try {
        const title = req.query;

        const news = await searchByTitleService(title);
        if (news.length === 0)
        {
            return res.status(400).send({message: "No news found"});
        }
        return res.send({ news:
            {
                results: news.map(item => ({
                    id: item._id,
                    title: item.title,
                    text: item.text,
                    banner: item.banner,
                    likes: item.likes,
                    comments: item.comments,
                    name: item.user.name,
                    userName: item.user.username,
                    userAvatar: item.user.avatar
    
                }))
            }});

    } catch (err) {
        res.status(500).json({message: err.message});
    };
}

const searchByUser = async (req, res) => {
    try {
        id = req.userId(user);
        const news = await searchByUserService(id);
    } catch (err) {
        res.status(500).json({message: err.message});
    };
    return res.send({ news:
        {
            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                userName: item.user.username,
                userAvatar: item.user.avatar

            }))
        }});
};

const updateNews = async (req, res) => {
    try {
        console.log("Entrei aqui");
        const {title, text, banner} = req.body;
        const { id } = req.params;
        console.log(title);
        if (!title && !text && !banner) {
            res.status(403).send({message: "Submite at leats one field to update"});

        }
        const news = await findByIdService(id);
        if (news.user._id != req.userId) {
            return res.status(400).send({message: "Invalid operation"});
        }
        
        await updateNewsService(id, title, text, banner);
        return res.status(200).send({message: "Updated news successfuly!"});
    }
    catch (err) {
        res.status(500).json({message: err.message});
    };

};

const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await findByIdService(id);
        if (news.user._id != req.userId) {
            return res.status(400).send({message: "Invalid operation"});
        }
        
        await deleteNewsService(id);
        return res.status(200).send({message: "Deleted news successfuly!"});
    }
    catch (err) {
        res.status(500).json({message: err.message});
    };

};

const likeNews = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const newsLiked = await likeNewsService (id, userId);
        //console.log(newsLiked);
        if (!newsLiked)
        {
            await deleteLikeNewsService(id, userId);
            return res.status(200).send({message: "Liked deleted successfuly!"});
        }

      
        return res.status(200).send({message: "Liked"});
    }
    catch (err) {
        res.status(500).json({message: err.message});
    };
}
export {createNews, 
        findAllNews, 
        topNews, 
        findById, 
        searchByTitle, 
        searchByUser, 
        updateNews, 
        deleteNews,
        likeNews}