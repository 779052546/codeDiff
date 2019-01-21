<template>
  <div class="page-index">      

        <Form ref="formCustom" :inline="true">
            <FormItem style="width:200px">
                <Select v-model="fontSize" @on-change="changeFontSize()">
                    <Option v-for="item in fontSizeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem style="width:200px">
                <Select v-model="lang">
                    <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem style="width:400px">
                <Input type="text" v-model="oldUrl"></Input>
            </FormItem>
             <FormItem>
                <Button type="primary" @click="getOldStr()">获取原文件</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="diffBtn()">比较差异</Button>
            </FormItem>
        </Form>

        <Row style="height:550px;">       
            <editor v-model="newStr" @init="editorInit" :lang="lang" theme="tomorrow_night_eighties" height="500" :width="split" class="fl changeSize"></editor>   
            <editor v-model="oldStr" @init="editorInit" :lang="lang" theme="tomorrow_night_eighties" height="500" v-if="isOld" width="50%" class="fl changeSize" :readOnly="true"></editor>      
            <div v-if="isDiff" style="font-size:18px">
                <span class="fl">{{newHash}}</span>
                <span class="fr">{{oldHash}}</span>
            </div>
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
            newHash:'',
            oldHash:'',
            oldUrl:'https://raw.githubusercontent.com/goharbor/harbor/ebf12fc31bbcb8ed479f0fe97cc6ab9619590b45/docs/swagger.yaml',
            isOld:false,
            isDiff:false,
            isSideLine:false,
            lang:'html',
            fontSize:'18px',
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
            fontSizeList: [
                {
                    value: '14px',
                    label: '14px'
                },
                {
                    value: '16px',
                    label: '16px'
                }, 
                {
                    value: '18px',
                    label: '18px'
                },  
                {
                    value: '20px',
                    label: '20px'
                },             
                {
                    value: '22px',
                    label: '22px'
                },  
                {
                    value: '24px',
                    label: '24px'
                },                     
                {
                    value: '26px',
                    label: '26px'
                }, 
                {
                    value: '28px',
                    label: '28px'
                },      
                {
                    value: '30px',
                    label: '30px'
                },         
            ],
        };
    },
    created(){
        
    },
    mounted(){
        this.changeFontSize();
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
            this.newHash = sha1(this.newStr);
            this.oldHash = sha1(this.oldStr);
            this.isDiff=true;
        },
        //获取原文件
        getOldStr(){
            this.$get(this.oldUrl).then(res=>{
                this.split = '50%';
                this.isOld=true;
                this.oldStr = res.data ? res.data : '';
            })
        },
        //更换对比显示方式
        changeMethod(){
            this.diffMethod = !this.isSideLine ? 'side-by-side' : 'line-by-line';
            // this.diffBtn();
        },
        //改变字体大小
        changeFontSize(){
            $('.changeSize').css("fontSize",this.fontSize)
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
