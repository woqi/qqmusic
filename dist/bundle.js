/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// import './tab.js'
// import{Search} from './search.js'
// import{TopList} from './toplist.js'
// import{Recommend} from './recommend.js'
// import{MusicPlayer} from './music_play.js'


(function () {

    fetch('https://qq-music-api.now.sh')
    //https://qq-music-api.now.sh
    //json/rec.json
    .then(function (res) {
        return res.json();
    }).then(render);

    fetch('json/rank.json').then(function (res) {
        return res.json();
    }).then(function (json) {
        return json.data.topList;
    }).then(renderTopLists);

    //测试
    //let test =  player.lyrics.reset(text)
    //测试   

    var search = new Search(document.querySelector('#search-view'));
    var player = new MusicPlayer(document.querySelector('#player'));

    window.search = search;
    window.player = player;

    document.querySelector('#header .player').addEventListener('click', function () {
        player.show();
    });
    onHashChange();
    window.addEventListener('hashchange', onHashChange);
    function onHashChange() {
        var hash = location.hash;
        if (/^#player\?.+/.test(hash)) {
            var matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g);
            //indexOf('?') 问号的位置，slice截取问号位置+1的第8位进行match（检索）
            //\w+,匹配字母或数字或下划线或汉字一次或多次         
            //[^&]+,除了&外出现一次或多次
            var options = matches && matches.reduce(function (res, cur) {
                var arr = cur.split('=');
                res[arr[0]] = decodeURIComponent(arr[1]);
                return res;
            }, {});
            player.play(options);
        } else {
            player.hide();
        }
    }

    function render(json) {
        renderSlider(json.data.slider);
        renderRadio(json.data.radioList);
        renderPlaylists(json.data.songList);
        lazyload(document.querySelectorAll('.lazyload')); //引入懒加载
    }

    function renderSlider(slides) {
        slides = slides.map(function (slide) {
            //map映射
            return { link: slide.linkUrl, image: slide.picUrl };
        });
        new Slider({
            el: document.querySelector('#slider'),
            slides: slides
        });
    }

    function renderRadio(radios) {
        document.querySelector('.radios .list').innerHTML = radios.map(function (radio) {
            return '\n            <li class="list-item">\n                <a href="" class="list-main">\n                    <div class="list-media">\n                        <img class="lazyload" data-src="' + radio.picUrl + '">\n                        <span class="icon icon-play"></span>\n                    </div>\n\n                    <div class="list-info">\n                        <h3>' + radio.Ftitle + '</h3>\n                    </div>\n                </a>\n                \n            </li>\n            ';
        }).join('');
    }

    function renderPlaylists(playlists) {
        document.querySelector('.playlists .list').innerHTML = playlists.map(function (playlist) {
            return '\n            <li class="list-item">\n                <a href="" class="list-main">\n                    <div class="list-media">\n                        <img class="lazyload" data-src="' + playlist.picUrl + '">\n                        <span class="icon icon-play"></span>\n                    </div>\n                    <div class="list-info">\n                        <h3>' + playlist.songListDesc + '</h3>\n                    </div>\n                </a>\n                \n            </li>\n            ';
        }).join('');
    }

    function renderTopLists(list) {
        document.querySelector('.toplist-wrap .topic').innerHTML = list.map(function (item) {
            return '<li class="topic-item">\n            <div class="topic-main">\n                <a href="" class="topic-media">                                   \n                    <img class="lazyload" data-src="' + item.picUrl + '">\n                    <span class="listen-count"><i class="icon icon-listen"></i>' + (item.listenCount / 10000).toFixed(1) + '\u4E07</span>\n                </a>\n                <div class="topic-info">\n                    <div class="topic-cont">\n                        <h3 class="topic-tit">' + item.topTitle + '</h3>                                            \n                        ' + songList(item.songList) + '   \n                    </div>\n                    <i class="topic-arrow"></i>\n                </div>\n            </div>\n        </li>';
        }).join('');
        lazyload(document.querySelectorAll('.toplist-wrap .topic .lazyload'));

        function songList(songs) {
            return songs.map(function (song, i) {
                return '\n        <p>' + (i + 1) + '<span class="text-name">' + song.songname + '</span>- ' + song.singername + '</p> \n        ';
            }).join('');
        }
    }
})();

/***/ })
/******/ ]);