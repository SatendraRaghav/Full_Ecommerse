class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr
    }
    search(){
        const keyword = this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $option:"i"
            },
        }:{};
        this.query = this.query.find(...keyword)
        return this;
    }
    filter(){
        const queryCopy = {...this.queryStr};
        const removeFields = ["keyword","limit","page"];
        removeFields.forEach(key=> delete queryCopy[key])
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b (gt|gte|It|Ite)\b/g,key=>`$${key}`);
        this.query = this.query.find(JSON.parse(queryCopy));
        return this
    }
    pagination(resultPerPage){
        const page = this.queryStr.page||1;
        this.query = this.query.find().limit(resultPerPage).skip((page-1)*resultPerPage)
        return this
    }
}
module.exports = ApiFeatures;