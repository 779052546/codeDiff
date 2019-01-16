<template>
  <div class="page-index">      

        <Form ref="formCustom" :inline="true">
            <FormItem prop="oldUrl" style="width:200px">
                <Select v-model="lang">
                    <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem prop="oldUrl" style="width:400px">
                <Input type="text" v-model="oldUrl"></Input>
            </FormItem>
             <FormItem>
                <Button type="primary" @click="getOldStr()">获取原文件</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="diffBtn()">比较差异</Button>
            </FormItem>
        </Form>

        <Row style="height:500px;">
            <!-- <div class="demo-split">
                <Split :model="split">
                    <div slot="left" class="demo-split-pane">
                        <editor v-model="newStr" @init="editorInit" :lang="lang" theme="tomorrow_night_eighties" height="500"></editor>
                    </div>
                    <div slot="right" class="demo-split-pane">                     
                        <editor v-model="oldStr" @init="editorInit" :lang="lang" theme="tomorrow_night_eighties" height="500" v-if="isOld"></editor>
                    </div>
                </Split>
            </div>          -->
            <editor v-model="oldStr" @init="editorInit" :lang="lang" theme="tomorrow_night_eighties" height="500" v-if="isOld" width="50%" class="fl" :readOnly="true"></editor>
            <editor v-model="newStr" @init="editorInit" :lang="lang" theme="tomorrow_night_eighties" height="500" :width="split" class="fl"></editor>         
        </Row>
 
        <Row v-if="isDiff">  
            <div style="margin:20px 0 10px 0">
                side-by-side
                <i-switch v-model="isSideLine" @on-change="changeMethod()" />
                line-by-line  
            </div>
            <div v-html="prettyHtml" class="of"></div>
        </Row>      
  </div>
</template>

<script>
import { Diff2Html } from 'diff2html/src/diff2html.js';
import { createTwoFilesPatch } from 'diff/lib/index.es6.js';
import 'diff2html/dist/diff2html.min.css';
import editor from 'vue2-ace-editor';
import '../assets/lib/sha1.js';
// import 'brace/mode/javascript';
// import 'brace/theme/chrome';

export default {
    components: {
        editor
    },
    data () {
        return {
            split:'100%',
            diffs: '',
            newStr:'',
            oldStr:'',
            oldUrl:'https://raw.githubusercontent.com/goharbor/harbor/ebf12fc31bbcb8ed479f0fe97cc6ab9619590b45/docs/swagger.yaml',
            isOld:false,
            isDiff:false,
            isSideLine:false,
            lang:'html',
            diffMethod:'side-by-side',
            langList: [
                    {
                        value: 'html',
                        label: 'html'
                    },
                    {
                        value: 'yaml',
                        label: 'yaml'
                    }, 
                    {
                        value: 'java',
                        label: 'java'
                    },  
                    {
                        value: 'javascript',
                        label: 'javascript'
                    },             
                    {
                        value: 'json',
                        label: 'json'
                    },  
                    {
                        value: 'jsp',
                        label: 'jsp'
                    },                     
                    {
                        value: 'mysql',
                        label: 'mysql'
                    }, 
                    {
                        value: 'less',
                        label: 'less'
                    },      
                    {
                        value: 'css',
                        label: 'css'
                    },         
                ],
        };
    },
    created(){
        
    },
    computed: {
        prettyHtml: function() {
            return Diff2Html.getPrettyHtml(this.diffs, {
                inputFormat: 'diff',
                showFiles: true,
                matching: 'lines',
                outputFormat: this.diffMethod
            });
        }
    },
    methods:{
        //初始化编辑器
        editorInit: function () {
            require('brace/ext/language_tools'); //language extension prerequsite...
            require('brace/mode/html');                
            require('brace/mode/javascript');    //language
            require('brace/mode/less');
            require('brace/mode/json');
            require('brace/mode/jsp');
            require('brace/mode/java');
            require('brace/mode/yaml');
            require('brace/mode/mysql');
            require('brace/mode/css');
            require('brace/theme/tomorrow_night_eighties');
            // require('brace/snippets/javascript'); //snippet
        },
        //差异对比
        diffBtn(){          
            this.diffs = createTwoFilesPatch(sha1(this.oldStr),sha1(this.newStr),this.oldStr,this.newStr);
            this.isDiff=true;
        },
        //获取原文件
        getOldStr(){
            this.$get(this.oldUrl).then(res=>{
                this.split = '50%';
                this.isOld=true;
                // this.oldStr = res.data ? res.data : '';
                this.oldStr = `swagger: '2.0'
                        info:
                        title: Harbor API
                        description: These APIs provide services for manipulating Harbor project.
                        version: 1.7.0
                        host: localhost
                        schemes:
                        - http
                        - https
                        basePath: /api
                        produces:
                        - application/json
                        - text/plain
                        consumes:
                        - application/json
                        securityDefinitions:
                        basicAuth:
                            type: basic
                        security:
                        - basicAuth: []`
            })
        },
        //更换对比显示方式
        changeMethod(){
            this.diffMethod = !this.isSideLine ? 'side-by-side' : 'line-by-line';
            // this.diffBtn();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fl{
    float: left;
}
.fr{
    float: right;
}
.of{
    overflow: hidden;
}
</style>
