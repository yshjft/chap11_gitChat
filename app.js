const express=require('express');
const path=require('path');
const morgan=require('morgan');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const flash=require('connect-flash');
require('dotenv').config();

const webSocket=require('./socket');
const indexRouter=require('./routes/index');

const app=express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set ('port', process.env.PORT || 8015);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(process.env.SECRET_CODE));
app.use(session({
  resave : false,
  saveUninitialized:false,
  secure : process.env.SECRET_CODE,
  cookie:{
    httpOnly:true,
    secure: false,
  }
}));
app.use(flash());

app.use('/', indexRouter);

app.use((req, res, next)=>{
  const err=new Error('Not Found');
  err.status=404;
  next(err);
});

app.use((err, req, res, next)=>{
  res.locals.message=err.messag;
  res.locals.error=req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const server=app.listen(app.get('port'), ()=>{
  console.log(app.get('port'),'번 포트에서 대기 중');
});

webSocket(server);