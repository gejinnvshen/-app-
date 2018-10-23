var express = require('express');
var app = express();
var swig = require('swig');  //加载模版
var MongoClient = require('mongoose');
var bodyParser = require('body-parser');

app.engine('html',swig.renderFile);   //定义模版引擎，第一个参数是模版引擎名称，同时也是模版文件的后缀，使用swig.renderFile方法解析后缀威html的文件
app.set('views','./views');  //设置模版存放目录，第一个参数必须是views,第二个参数是目录
app.set('view engine','html');   //注册模版引擎,第一个参数必须是view engine,第二个参数和app.engine中定义的模版引擎的名称是一致的(第一个参数)
swig.setDefaults({cache: false});   //在开发过程中，需要取消模版默认缓存

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/viewOne',function (req,res) {            //  /map.html表示在地址栏输入http://localhost:4000/map.html的意思，然后返回html文件夹下的map.html文件显示

    /*
    * 读取views文件夹下的指定文件，解析并返回给客户端
    * 第一个参数：指定的文件，相对于views目录 views/viewOne.html ，第二个参数{name:'xiao'}传递给viewOne页面，在viewOne页面可以这样取{{name}} ，如果有第三个参数则res.sendFile(__dirname + '/views/viewTwo.html')或者res.render("文案");
    * */
    res.render('viewOne',{name: 'xiao'},function (err,html) {
        //console.log(html);  //html是viewOne文件里的内容
        /*res.sendFile(__dirname + '/views/viewTwo.html');*/
        res.send(html);  //html是viewOne.html
    });
})
app.get('/viewTwo',function (req,res) {            //  /map.html表示在地址栏输入http://localhost:4000/map.html的意思，然后返回html文件夹下的map.html文件显示
    res.render('viewTwo');
})

//app.use('/admin',require('./routers/admin'));   //app.use加载用于处理http請求的middleware（中间件），当一个请求来的时候，会依次被这些 middlewares处理,在这里middlewares就是admin.js
//app.use('/api',require('./routers/api'));
//app.use('/',require('./routers/main'));

MongoClient.connect('mongodb://localhost:27017/node数据库',{ useNewUrlParser: true },function (err,db) {
    console.log('数据库链接成功')
});
var Schema = MongoClient.Schema; //创建一个Schema模型骨架，并且设置好user模版  Schema是一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
var userSchema = new Schema({  //userSchema由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
    firstName:{type:String},
    lastName:{type:String}
});
var User = MongoClient.model("User",userSchema);  //Schema发布一个User的Model
var User2 = MongoClient.model("User",userSchema);  //Schema发布一个User的Model
app.get('/regist',function (req,res) {  //处理regist的get请求
    console.log('请求成功')
    //console.log(req.query.first_name)
    var user_1 = new User({
        firstName: req.query.first_name,   //这里的firstName要和userSchema里的firstName同名
        lastName: req.query.last_name
    });
    //存储数据
    user_1.save(function (err) {
        if(err){
            res.end('Error');
            return next();
        }


    });
   //查询数据    find({})意为返回所有文档
    User.find({"firstName":"lll"}, function (err, results) {  //find({"firstName":"rr"}  查询指定条件的数据
        let dataFromDb = results[0].lastName;
        if(err){
            res.end('Error');
            return next();
        }else if(dataFromDb == "lll"){
            console.log("跳转到viewOne")
            res.render('viewOne',{data: dataFromDb},function (err,html) {
                res.send(html);
            });
        }
        console.log(results)  //results是数据库存储的指定的数据

        //res.json(results);//以json数据类型返回值 返回到进行请求的页面 results是数据库存储的所有数据
    });
    /*
    //插入数据
    let data = {"firstName":'gg',"lastName":'gejin'};
    User.create(data,function (err,res) {
        if(err){
            res.end('Error');
            return next();
        }
    });
    let whereStr = {"firstName":"方法f"};
    let updateStr = {$set:{"lastName":"数据修改23"}};
    User.updateOne(whereStr,updateStr,function (err,res) {
        if (err) {
            console.log('加入购物车失败：' + err);
            return
        } else {
            // add
            console.log("修改成功")
        }
    });
*/

});

app.post('/personInfo',function (req,res) {  //处理regist的get请求
    console.log('ajax请求成功')
    console.log(req.body);
    console.log(typeof req.body);
    console.log(req.body.name);
    var user_2 = new User2({
        firstName: req.body.name,
        lastName: req.body.age
    });
    //存储数据
    user_2.save(function (err) {
        if(err){
            res.end('Error');
            return next();
        }
    });

    //下面这个失败了，因为跨域问题，ajax的问题
    //查询数据    find({})意为返回所有文档
    User.find({"firstName":"or"}, function (err, results) {  //find({"firstName":"rr"}  查询指定条件的数据
        let dataFromDb = results[0].lastName;
        if(err){
            res.end('Error');
            return next();
        }else if(dataFromDb == "or"){
            console.log("跳转到viewOne")
            res.render('viewOne',{data: dataFromDb},function (err,html) {
                res.send(html);
            });
        }
        console.log(results)  //results是数据库存储的指定的数据

        //res.json(results);//以json数据类型返回值 返回到进行请求的页面 results是数据库存储的所有数据
    });
});

var db = MongoClient.connection;
db.on('open',function () {
    console.log('MongoDB开启成功')
})
db.on('error',function () {
    console.log('MongoDB连接失败');
})


app.listen(4000,function () {
    console.log("连接上了")
})
