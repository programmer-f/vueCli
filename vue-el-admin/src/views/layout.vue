<template>
    <div>
        <el-container style="position:absolute;left:0;right:0;top:0;bottom:0;overflow: hidden;">
            <el-header class="d-flex align-items-center" style="background:#545c64;">
                <a class="h5 text-light mb-0 mr-auto">UNI-ADMIN</a>
                <el-menu
                        :default-active="navBar.active"
                        mode="horizontal"
                        @select="handleSelect"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-menu-item
                        v-for="(item,index) in navBar.list"
                        :key="index"
                        :index="index | numToString">
                        {{item.name}}
                    </el-menu-item>
                    <el-submenu index="100">
                        <template slot="title">
                            summer
                            <el-avatar
                                    size="small"
                                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                        </template>
                        <el-menu-item index="100-1">修改</el-menu-item>
                        <el-menu-item index="100-2">退出</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-header>
            <el-container style="height:100%;padding-bottom: 60px;">
                <!--侧边布局-->
                <el-aside width="200px">
                    <el-menu
                            :default-active="slideMenuActive"
                            @select="slideSelect"
                            >
                        <el-menu-item
                                :index="index | numToString"
                                v-for="(item,index) in sildeMenus "
                                :key="index"
                        >
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <!--主布局-->
                <el-main>
                    <li v-for="i in 100" :key="i">{{i}}</li>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import common from '@/common/mixins/common';
    export default {
        name: "layout",
        mixins:[common],
        data(){
            return{
                navBar:{
                    active:'0',
                    list:[
                        {
                            name:'首页',
                            subActive:'0',
                            subMenu:[
                                {
                                    icon:'el-icon-s-home',
                                    name:'后台首页'
                                },
                                {
                                    icon:'el-icon-s-claim',
                                    name:'商品列表'
                                },
                            ]
                        },
                        {
                            name:'商品',
                            subActive:'0',
                            subMenu:[
                                {
                                    icon:'el-icon-s-claim',
                                    name:'商品列表'
                                },
                            ]
                        },
                        {name:'订单'},
                        {name:'会员'},
                        {name:'设置'},
                    ]
                }
            }
        },
        computed:{
            sildeMenus(){
                return this.navBar.list[this.navBar.active].subMenu || [];
            },
            slideMenuActive:{
                set(val){
                    this.navBar.list[this.navBar.active].subActive = val;
                },
                get(){
                    return this.navBar.list[this.navBar.active].subActive || '0';
                }
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key);
                this.navBar.active = key;
            },
            slideSelect(key, keyPath) {
                this.slideMenuActive = key;
            },
        },
    }
</script>

<style scoped>
    /*.el-header{*/
        /*background-color: #B3C0D1;*/
        /*color: #333;*/
    /*}*/
    /*.el-aside {*/
        /*background-color: #D3DCE6;*/
        /*color: #333;*/
    /*}*/
    /*.el-main {*/
        /*background-color: #E9EEF3;*/
        /*color: #333;*/
    /*}*/
</style>
