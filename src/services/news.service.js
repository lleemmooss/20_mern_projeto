import News from "../models/News.js";

const createServiceNews = (body) => News.create(body);

const findAllServiceNews = (offset, limit) => 
        News.find()
            .sort({_id: -1})
            .skip(offset)
            .limit(limit)
            .populate("user");

const countNews = () => News.countDocuments();   

const topNewsService = () => News.findOne().sort({_id: -1}).populate("user");

const findByIdService = (id) => News.findById(id).populate("user");

const searchByTitleService = (title) => News.find ({
    title: {$regex: `${title || ""}`, $options: "I"}
}).sort({_id: -1}).populate("user");

const searchByUserService = (id) => News.findById({user: id}).sort({_id: -1}).populate("user");

const updateNewsService = (id, title, text, banner) => 
    News.findOneAndUpdate({_id: id}, {title, text, banner}, {rowResult: true});

const deleteNewsService = (id) => News.findOneAndDelete({_id: id});    

const likeNewsService = (idNews, userId) => {
    console.log(userId);
    return News.findOneAndUpdate({_id: idNews, "likes.UserId": { $nin: [userId] } }, 
                          { $push: {likes: {userId, created: new Date()}}});
}                          

const deleteLikeNewsService = (idNews, userId) => 
    News.findOneAndUpdate ({_id: idNews}, 
                           { $pull: {likes: {userId}}});

export {
    createServiceNews, 
    findAllServiceNews,
    countNews,
    topNewsService,
    findByIdService,
    searchByTitleService,
    searchByUserService,
    updateNewsService,
    deleteNewsService,
    likeNewsService,
    deleteLikeNewsService
}