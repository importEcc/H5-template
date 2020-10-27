<!--
 * @Author: 王精华
 * @Date: 2020-09-07 09:08:42
 * @LastEditTime: 2020-09-07 11:41:46
 * @LastEditors: 王精华
 * @Description: 
-->
<template>
  <div v-cloak
       id="index"
       class="inbody-top">
    <!-- banner -->
    <article class="banner">
      <!-- Swiper -->
      <div class="swiper-container swiper-container-webh5">
        <div class="swiper">
          <van-swipe :autoplay="2000"
                     :loop="true"
                     indicator-color="#fff">
            <van-swipe-item v-for="item in carouselData"
                            :key="item.picsurl">
              <img :src="item.picsimage"
                   @click="carouselLink(item)" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </article>
    <div id="tabtop"
         class="courseTbadw"
         style="z-index:99;">
      <div class="courseTbabox">
        <van-tabs v-model="searchData.label_id"
                  title-active-color="#000"
                  title-inactive-color="#A9A9B2"
                  color="#10dee8"
                  @click="onClick">
          <van-tab v-for="item in courseTag"
                   :key="item.id"
                   :title="item.name"
                   :name="item.id">
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <van-list v-model="loading"
              :finished="finished"
              finished-text="---我们是有底线的---"
              @load="onLoad">
      <!-- <van-cell v-for="item in list" :key="item" :title="item"/> -->
      <div v-for="item in courseList"
           :key="item.key">
        <!-- 课件包 -->
        <div v-if="item.type === '3'">
          <div class="course-normal"
               style="min-height: 2rem">
            <img :src="item.coursecoverimage"
                 class="ggimg" />
            <div class="name"
                 style="margin-top: 8px;">{{ item.name }}</div>
            <div class="time">
              {{ item.start_time }} - {{ item.end_time }}
            </div>
          </div>
        </div>
        <!-- 广告课 -->
        <div v-if="item.type === '2'">
          <div class="course-normal"
               style="min-height:8rem"
               @click="guanggao(item.target_url, item.target_way)">
            <img :src="item.course_image"
                 class="ggimg" />
            <div class="bottom">
              <div class="ggtitle">{{ item.coursename }}</div>
              <!-- <div class="gg-time">2019-10-12 —— 2020-01-01</div> -->
              <div class="time">
                {{ item.start_time }} - {{ item.end_time }}
              </div>
            </div>
          </div>
        </div>
        <!-- 普通课 -->
        <div v-if="item.type === '1'"
             class="course-normal"
             @click="gotocourse(item.id)">
          <div class="label">{{ item.label_str }}</div>
          <div class="name">{{ item.coursename }}</div>
          <div class="time">{{ (item.start_time).split(' ',2)[0] }} - {{ item.end_time.split(' ',2)[0] }}</div>
          <div class="scroll-horizontal">
            <div class="wrapper">
              <div v-for="(tlists, index) in item.lecturer_name"
                   :key="index"
                   class="item">
                <img :src="tlists.image" />
                <div>{{ tlists.nickname }}</div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="bottom-left">
              <span>限售 {{ item.xnumber }} 人</span>
              <span>|</span>
              <span>已报
                <span style="color:#33ccd3;">{{ item.order_number }}</span>
                人</span>
            </div>
            <div class="bottom-right">
              <div v-if="item.is_assemble === '1'">
                <div v-if="Number(item.assemble_price) !== 0"
                     class="list_money_left">
                  <span class="alit"><img class="mf-icon"
                         src="../../assets/tgicon.png" /></span>
                  <span class="alit"
                        style="font-size:13px;">￥</span>
                  <span class="abig">{{ item.assemble_price }}</span>
                </div>
                <div v-else
                     class="list_money_left">
                  <span class="txt">免费</span>
                </div>
              </div>
              <div v-else>
                <div v-if="Number(item.price) !== 0"
                     class="list_money_left">
                  <span class="alit"
                        style="font-size:13px;">￥</span>
                  <span class="abig">{{ item.price }}</span>
                </div>
                <div v-else
                     class="list_money_left">
                  <span class="txt">免费</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 广告课 -->
    </van-list>
  </div>
</template>

<script>
import { getBannerList, getCourseLabel, getCourseList } from "@/api/index";
import { Swipe, SwipeItem, Tab, Tabs, List } from 'vant'
import Vue from 'vue'
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
export default {
  name: 'Index',
  data () {
    return {
      carouselData: [],
      courseList: [],
      list: [],
      loading: false,
      finished: false,
      courseTag: [],
      postloding: false,
      invitation_code: "",
      searchData: {
        project_id: "0",
        label_id: "",
        page: 1,
        pagesize: 10
      },
    }
  },
  created () {
    this.invitation_code = this.$route.query.invitation_code;
    this.getBanner();
    this.getCourseLabel();
  },
  methods: {
    // 课程标签点击事件
    onClick () {
      this.courseList = [];
      this.searchData.page = 1;
      this.getCourseLists();
      // this.$toast(title);
    },
    // 获取课程标签
    getCourseLabel () {
      if (this.postloding) {
        return;
      }
      this.postloding = true;
      const data = {
        is_project: 1,
        is_label: 1,
        project_id: ''
      };
      getCourseLabel(data)
        .then(res => {
          this.postloding = false;
          // this.searchData.label_id = this.courseTag[0].id;
          // this.getCourseList();
          if (res.data.label_data && Array.isArray(res.data.label_data)) {
            if (!res.data.label_data.length) {
              this.loading = false;
              this.finished = true;
            }
            let arr = res.data.label_data
            arr.forEach((e, index) => {
            });
            this.courseTag = res.data.label_data;
            this.courseTag.unshift({
              id: 0,
              name: "全部"
            })
            this.searchData.label_id = this.courseTag[0].id;
            // this.searchData.page = 1; // 初次加载时
            this.getCourseLists();
          } else {
            this.courseTag = [];
          }
        })
        .catch(() => {
          this.postloding = false;
        });
    },

    // 获取课程列表
    getCourseLists () {
      // this.courseList = [];
      if (this.postloding) {
        return;
      }
      this.postloding = true;
      getCourseList(this.searchData)
        .then(res => {
          this.postloding = false;
          this.loading = false;
          if (res.data && Array.isArray(res.data)) {
            let item = res.data.map(item => {
              const data = {
                ...item.data
              };
              // data.lecturer_name = data.lecturer_name.slice(0, 5);
              // data.start_time = data.start_time.slice(0, 10).replace(/-/g, ".");
              // data.end_time = data.end_time.slice(0, 10).replace(/-/g, ".");
              return data;
            });
            if (res.data == '') {
              this.finished = true;
            } else {
              this.courseList.push(...item)
              this.finished = false;
              this.searchData.page++;
            }
          } else {
            this.courseList = [];
          }
        })
        .catch(() => {
          this.postloding = false;
        });
    },

    // 加载事件
    onLoad () {
      this.getCourseLists();
    },

    // 获取轮播图
    getBanner () {
      const data = {
        source_id: 1,
        type: 18,
        project_id: 2
      };
      getBannerList(data).then(res => {
        if (res.data && Array.isArray(res.data)) {
          this.carouselData = res.data;
        } else {
          this.carouselData = [];
        }
      });
    },

    // 轮播图点击跳转
    carouselLink (item) {
      if (item.jumptype === "0") {
        return;
      }
      if (item.jumptype === "2") {
        this.$router.push({ name: '课程详情', query: { courseId: course, } })
      }
    },

    // 点击课程跳转
    gotocourse (course) {
      this.$router.push({ name: 'courseDetails', query: { courseId: course, } })
    },
    // 广告跳转
    guanggao (target_url, target_way) {
      if (Number(target_way) === 1) {
      } else {
        this.$router.push("/course_details?courseid=" + target_url);
      }
    },
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
