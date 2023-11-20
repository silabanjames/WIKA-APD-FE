<template>
        <div id="sidebar-menu">
          <!-- {{layoutobject}}	
          fdsfdsf{{[layoutobject.split(' ').includes('horizontal-wrapper')]}} -->
          <ul class="sidebar-links custom-scrollbar" id="myDIV"
          :style="[layoutobject.split(' ').includes('horizontal-wrapper')  ? layout.settings.layout_type=='rtl'? {'  -right': margin+'px'} : {'margin-left': margin+'px'} :  { margin : '0px'}]"
          >
            <li class="back-btn">
              <RouterLink to="/">
                <img
                  class="img-fluid"
                  src="../../assets/images/logo/logo-icon.png"
                  alt=""
              /></RouterLink>
              <div class="mobile-back text-end">
                <span>Back</span
                ><i class="fa fa-angle-right ps-2" aria-hidden="true"></i>
              </div>
            </li>

            <div class="mt-3"></div>
            
            <li v-for="(menuItem, index) in menuItems" :key="index" class="sidebar-list">
              <template v-if="!menuItem.admin || (menuItem.admin && role.toLowerCase()=='admin') ">
                  
                <a href="javascript:void(0)" class="sidebar-link sidebar-title" :class="{ 'active': menuItem.active }"
                    v-if="menuItem.type=='sub'" @click="setNavActive(menuItem, index)">
                    

                    <svg class="stroke-icon">
                        <use :xlink:href="require('@/assets/svg/icon-sprite.svg') + `#${menuItem.icon}`"></use>
                    </svg>
                    <svg class="fill-icon">
                        <use :xlink:href="require('@/assets/svg/icon-sprite.svg') + `#${menuItem.iconf}`"></use>
                    </svg>
                    <span class="lan-3">
                        {{ menuItem.title }}
                    </span>
                    <div class="according-menu" v-if="menuItem.children">
                        <i class="fa fa-angle-right pull-right"></i>
                    </div>
                
                </a>

                <RouterLink :to="menuItem.path" class="sidebar-link sidebar-title" v-if="menuItem.type == 'link'"
                    :class="{ 'active': menuItem.active }" v-on:click="hidesecondmenu()"
                    @click="setNavActive(menuItem, index)">
                    <svg class="stroke-icon">
                        <use :xlink:href="require('@/assets/svg/icon-sprite.svg') + `#${menuItem.icon}`"></use>
                    </svg>
                    <svg class="fill-icon">
                        <use :xlink:href="require('@/assets/svg/icon-sprite.svg') + `#${menuItem.iconf}`"></use>
                    </svg>
                    <span>
                        {{ menuItem.title }}
                    </span>
                    <i class="fa fa-angle-right pull-right" v-if="menuItem.children"></i>
                </RouterLink>

                <ul class="sidebar-submenu" v-if="menuItem.children" :class="{ 'menu-open': menuItem.active }"
                      :style="{ display: menuItem.active ? '' : 'none' }">

                      <li v-for="(childrenItem, index) in menuItem.children" :key="index">
                        <RouterLink class="lan-4" :class="{ 'active': childrenItem.active }" :to="childrenItem.path"
                            v-if="childrenItem.type == 'link'" @click="setNavActive(childrenItem, index)"
                            v-on:click="hidesecondmenu()">
                            {{ (childrenItem.title) }}
                            <label :class="'badge badge-' + childrenItem.badgeType + ' pull-right'"
                                v-if="childrenItem.badgeType">{{ (childrenItem.badgeValue) }}</label>
                            <i class="fa fa-angle-right pull-right mt-1" v-if="childrenItem.children"></i>
                        </RouterLink>
                      </li>


                </ul>
              </template>
            </li>

          </ul>
        </div>
</template>
<script>
  import { mapState } from 'vuex';
  import { layoutClasses } from '../../constants/layout';
  
  export default {
    name: 'Navmenu',
    data() {
      return {
        layoutobj:{}
      };
    },
    computed: {
      ...mapState({
        menuItems: state => state.menu.data,
        layout: state => state.layout.layout,
        sidebar: state => state.layout.sidebarType,
        activeoverlay: (state) => state.menu.activeoverlay,
        togglesidebar: (state) => state.menu.togglesidebar,
        width: (state) => state.menu.width,
        height: (state) => state.menu.height,
        margin: (state) => state.menu.margin,
        menuWidth: (state) => state.menu.menuWidth,
        role: (state) => state.auth.user.role
      }),
      layoutobject: {	
        get: function () {	
          return JSON.parse(JSON.stringify(layoutClasses.find((item) => Object.keys(item).pop() === this.layout.settings.layout)))[this.layout.settings.layout];	
        },	
        set: function () {	
          this.layoutobj = layoutClasses.find((item) => Object.keys(item).pop() === this.layout.settings.layout);	
          this.layoutobj = JSON.parse(JSON.stringify(this.layoutobj))[this.layout.settings.layout];	
          return this.layoutobj;	
        }	
      }
    },
    watch: {
      width() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        window.addEventListener('scroll',this.handleScroll);
        this.handleScroll(); 
        if (window.innerWidth < 992) {
          const newlayout = JSON.parse(JSON.stringify(this.layoutobject).replace('horizontal-wrapper', 'compact-wrapper'));
          document.querySelector('.page-wrapper').className = 'page-wrapper ' + newlayout;
          this.$store.state.menu.margin = 0;
        } else {
          document.querySelector('.page-wrapper').className = 'page-wrapper ' + this.layoutobject;
        }

        if((window.innerWidth < 1199 && this.layout.settings.layout === 'Tokyo') || (window.innerWidth < 1199 && this.layout.settings.layout === 'Moscow') || (window.innerWidth < 1199 && this.layout.settings.layout === 'Rome')) {
          this.menuItems.filter(menuItem => {
            menuItem.active = false;
          });
        }
      }
    },
    created() {
    
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
      if (this.$store.state.menu.width < 991) {
        this.layout.settings.layout = 'Dubai';	
        this.margin = 0;
      }
      setTimeout(()=> {
        const elmnt = document.getElementById('myDIV');
        this.$store.state.menu.menuWidth = elmnt.offsetWidth;
        this.$store.state.menu.menuWidth > window.innerWidth  ? 
          (this.$store.state.menu.hideRightArrow = false,this.$store.state.menu.hideLeftArrowRTL = false) : 
          (this.$store.state.menu.hideRightArrow = false,this.$store.state.menu.hideLeftArrowRTL = true);
      }, 500);
      this.layoutobject = layoutClasses.find((item) => Object.keys(item).pop() === this.layout.settings.layout);	
      this.layoutobject = JSON.parse(JSON.stringify(this.layoutobject))[this.layout.settings.layout];
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },
    mounted() {   
      this.menuItems.filter(items => {
        if (items.path === this.$route.path)
          this.$store.dispatch('menu/setActiveRoute', items);
        if (!items.children) return false;
        items.children.filter(subItems => {
          if (subItems.path === this.$route.path)
            this.$store.dispatch('menu/setActiveRoute', subItems);
          if (!subItems.children) return false;
          subItems.children.filter(subSubItems => {
            if (subSubItems.path === this.$route.path)
              this.$store.dispatch('menu/setActiveRoute', subSubItems);
          });
        });
      });
    },
    methods: {
      handleScroll() {
        if(window.scrollY > 400){
          if(this.layoutobject.split(' ').pop() === 'material-type' || this.layoutobject.split(' ').pop() ==='advance-layout')
            document.querySelector('.sidebar-main').className = 'sidebar-main hovered';
        }else{
          if(document.getElementById('sidebar-main'))
            document.querySelector('.sidebar-main').className = 'sidebar-main';
        }
      },
      setNavActive(item) {
        this.$store.dispatch('menu/setNavActive', item);
        if(this.layoutobject.split(' ').includes('compact-sidebar') && window.innerWidth > 991) {
          if(this.menuItems.some(menuItem => menuItem.active === true)) {
            this.$store.state.menu.activeoverlay = true;
          } else {
            this.$store.state.menu.activeoverlay = false;
          }
        }
      },
      hidesecondmenu() {
        if(window.innerWidth < 991) {
          this.$store.state.menu.activeoverlay = false,
          this.$store.state.menu.togglesidebar = false;
          this.menuItems.filter(menuItem => {
            menuItem.active = false;
          });
        } else if(this.layoutobject.split(' ').includes('compact-sidebar')){
          this.$store.state.menu.activeoverlay = false,
          this.menuItems.filter(menuItem => {
            menuItem.active = false;
          });
        }
      },
      handleResize() {
        this.$store.state.menu.width = window.innerWidth - 450;
      },
    }
  };
</script>
