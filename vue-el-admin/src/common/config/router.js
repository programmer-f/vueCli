/*
* 对路由进行封装，将 ../../views 和 .vue后缀封装进去，只需要写具体的路径
* 例如：component:()=>import('../../views/login/index.vue')
* 封装后的写法： component:'login/index'
* */

let routes = [
    {
        path:'/',
        name:'layout',
        redirect:{ name:'index' },
        component:'layout',
        children:[
            {
                component:'index/index'
            },{
                component:'shop/goods/list'
            }
        ]
    },
    {
        component:'login/index'
    },
    {
        path:'*',
        redirect:{ name:'index' }
    }
];


let getRoutes = ()=>{
    //自动获取路由
    createRoute(routes);
    return routes;
};

//自动生成路由
function createRoute(arr){
        for (let i = 0; i < arr.length; i++){
            if (!arr[i].component) return ;
            //去除index
            let val = getValue(arr[i].component);
            //生成name
            arr[i].name = arr[i].name || val.replace(/\//g,'_');
            // 生成path
            arr[i].path = arr[i].path || `/${val}`;
            //自动生成component
            let componentFun = import(`../../views/${arr[i].component}.vue`);
            arr[i].component = () => componentFun;
            //判断回调
            if (arr[i].children && arr[i].children.length > 0){
                createRoute(arr[i].children);
            }
        }
}

function getValue(str) {
    //获取最后一个 / 的索引
    let index = str.lastIndexOf('/');
    //获取最后一个 / 后面的值
    let val = str.substring(index + 1,str.length);
    //判断是不是index结尾
    if (val === 'index'){
        // return str.substring(index,-1);
        return str.substring(0,index);
    }
    return str;
}

export default getRoutes();
