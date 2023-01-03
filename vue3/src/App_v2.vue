<template>
    <div id="app">
        <div class="search-input">
            <i class="iconfont iconsearch"></i>
            <input type="text" v-model="keywords" placeholder="搜索歌曲" @keyup.13="getSearchResult(keywords)" @input="getSuggest" />
            <i class="iconfont icondelete" @click="cancelSearch"></i>
        </div>
        <!-- 搜索历史 -->
        <template v-if="searchType == 1">
            <div class="search-history" v-if="history.length">
                <div class="search-history-head">
                    <span>历史记录</span>
                    <i class="iconfont icondelete1" @click="deleHistory"></i>
                </div>
                <div class="search-history-list">
                    <div @click="getSearchResult(item)" v-for="(item, index) in history" :key="index">{{item}}</div>
                </div>
            </div>

            <!-- 热搜榜 -->
            <div class="search-hot">
                <div class="search-hot-head">热搜榜</div>
                <div class="search-hot-item" v-for="(item, index) in searchHot" :key="index">
                    <div class="search-hot-top">{{index + 1}}</div>
                    <div class="search-hot-word">
                        <div>
                            {{item.searchWord}} <img :style="item.iconType == '5' ? {width: '10px'} : ''" v-show="item.iconUrl" :src="item.iconUrl" />
                        </div>
                        <div>{{item.content}}</div>
                    </div>
                    <span class="search-hot-count">{{item.score}}</span>
                </div>
            </div>
        </template>
        

        <!-- 搜索结果 -->
        <template v-if="searchType == 2">
            <div class="search-result">
                <div class="search-result-item" v-for="(item, index) in searchResult" :key="index">
                    <div class="search-result-word">
                        <div>{{item.name}}</div>
                        <div>{{`${item.artists && item.artists[0].name} - ${item.album && item.album.name}` }}</div>
                    </div>
                    <div class="iconfont iconbofang"></div>
                </div>
            </div>
        </template>
        

        <!-- 下拉提示 -->
        <template v-if="searchType == 3">
            <div class="search-suggest">
                <div class="search-suggest-head">{{`搜索'${keywords}'`}}</div>
                <div class="search-suggest-item" v-for="(item, index) in searchSuggest" :key="index" @click="getSearchResult(item.name)">
                    <i class="iconfont iconsearch"></i>  {{item.name}}
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import axios from 'axios';
import "@/assets/iconfont/iconfont.css";
export default {
    name: "App",
    data() {
        return {
            searchType: 1, //热搜 2. 搜索结果 3. 下拉提示
            searchHot: [],
            keywords: '',
            searchSuggest: [],
            history: []
            
        }
    },
    mounted() {
        axios.get('search/hot/detail').then(res => {
            this.searchHot = res.data.data || [];
        });
        this.getStorage({key: 'searchHistory', success: (data) => {
            this.history = data || [];
        }});
    },
    methods: {
        getSuggest() {
            if(!this.keywords) {
                this.searchType = 1;
                return;
            }
            
            axios.get('/search/suggest', {params: {keywords: this.keywords}}).then(res => {
                this.searchType = '3';
                this.searchSuggest = res.data.result.albums || [];
            })
        },
        cancelSearch() {
            this.keywords = '';
            this.searchType = 1;
        },

        getSearchResult(name) {
            // 更新history
            // let index = this.history.findIndex(item => item == name);
            // if(index == -1) {
            //     this.history.push(name);
            // }
            this.history.unshift(name);
            this.history = [...new Set(this.history)]; //数组去重
            if(this.history.length > 10) { //限制为10条
                this.history.length = 10;
            }
            this.setStorage({
                key: 'searchHistory',
                data: this.history
            })

            this.keywords = name;
            axios.get('/search', {params: {keywords: name}}).then(res => {
                this.searchType = '2';
                this.searchResult = res.data.result.songs || [];
            })
        },
        deleHistory() {
            this.history = [];
        },

        setStorage({key, data}) {
            window.localStorage.setItem(key, JSON.stringify(data));
        },

        getStorage({key, success}) {
            let data = window.localStorage.getItem(key);
            success(JSON.parse(data));
        }
    }
};
</script>

<style>
.search-input {
    display: flex;
    align-items: center;
    height: 35px;
    margin: 35px 15px 25px 15px;
    background: #f7f7f7;
    border-radius: 25px;
}

.search-input i {
    margin: 0 13px;
}

.search-input input {
    flex: 1;
    font-size: 14px;
    border: none;
    background: #f7f7f7;
    outline: none;
}

.search-history {
    margin: 0 15px 25px 15px;
    font-size: 14px;
}

.search-history-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
}

.search-history-list {
    display: flex;
    flex-wrap: wrap;
}

.search-history-list div {
    padding: 8px 14px;
    border-radius: 20px;
    margin-right: 15px;
    margin-bottom: 15px;
    background: #f7f7f7;
}

.search-hot {
    margin: 0 15px;
    font-size: 14px;
}

.search-hot-head {
    margin-bottom: 18px;
}

.search-hot-item {
    display: flex;
    align-items: center;
    margin-bottom: 29px;
}

.search-hot-top {
    color: #fb2222;
    width: 30px;
    margin-left: 4px;
}

.search-hot-word {
    flex: 1;
}

.search-hot-word div:nth-child(1) {
    font-size: 16px;
    color: black;
}
.search-hot-word div:nth-child(1) img {
    width: 25px;
}
.search-hot-word div:nth-child(2) {
    font-size: 12px;
    color: #878787;
}

.search-hot-word .iconfont {
    font-size: 16px;
    color: red;
}

.search-hot-count {
    color: #878787;
}

.search-result {
    border-top: 1px solid #e4e4e4;
    padding: 15px;
}

.search-result-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #e4e4e4;
}
.search-result-item div:nth-child(1) {
    font-size: 16px;
    color: 235790;
    margin-bottom: 6px;
}
.search-result-word>div:nth-child(2) {
    font-size: 12px;
    color: #898989;
}
.search-result-item i {
    font-size: 30px;
    color: #878787;
}

.search-suggest {
    border-top: 1px solid #e4e4e4;
    padding: 15px;
    font-size: 14px;
}

.search-suggest-head, .search-suggest-item {
    color: #4574a5;
    margin-bottom: 37px;
}

.search-suggest-item {
    color: #5d5d5d;
}

.search-suggest-item i {
    color: #bdbdbd;
    margin-right: 14px;
    position: relative;
    top: 1px;
}

</style>
