import Axios from 'axios';

// 管理员登录
const login = (userinfo) => {
    return Axios.post('/api/admin/adminLogin', userinfo);
};


// 发布文章
const createArticle = (data) => {
    return Axios.post('/api/admin/createArticle', data);
};

// 重新修改文章时create调用的
const findArticle = (id) => {
    return Axios.post('/api/admin/findArticle', id);
};

// 修改完成后文章重新提交调用的
const editArticle = (newForm) => {
    return Axios.post('/api/admin/editArticle', newForm);
};

// 删除文章
const deleteArticle = (id) => {
    return Axios.post('/api/admin/deleteArticle', id);
};

// 切换时文章列表查询
const articlelists = (pageInfo) => {
    return Axios.post('/api/admin/articlelists', pageInfo);
};

// 增加新的分类
const categoryAdd = (newCategory) => {
    return Axios.post('/api/admin/categoryAdd', newCategory);
};

// 分类重命名
const editCategory = (newCategory) => {
    return Axios.post('/api/admin/editCategory', newCategory);
};

// 删除重命名
const deleteCategory = (category) => {
    return Axios.post('/api/admin/delete', category);
};

// 获取用户列表
const userlists = (userInfo) => {
    return Axios.post('/api/admin/userlists', userInfo);
};

// 获取用户列表
const updataAdmin = (userInfo) => {
    return Axios.post('/api/admin/updataAdmin', userInfo);
};

export {
    login,
    createArticle,
    findArticle,
    editArticle,
    deleteArticle,
    articlelists,
    categoryAdd,
    editCategory,
    deleteCategory,
    userlists,
    updataAdmin
};
