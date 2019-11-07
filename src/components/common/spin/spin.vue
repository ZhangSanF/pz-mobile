<template>
    <transition name="fade">
        <div :class="classes" v-if="fullscreenVisible">
            <div :class="mainClasses">
                <span :class="dotClasses"></span>
                <div :class="textClasses"><slot></slot></div>
            </div>
        </div>
    </transition>
</template>
<script>
    import { oneOf } from '../../../assets/js/assist';
    import ScrollbarMixins from '../spin/mixin/mixins-scrollbar';

    const prefixCls = 'ivu-spin';

    export default {
        name: 'Spin',
        mixins: [ ScrollbarMixins ],
        props: {
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large', 'default']);
                },
                default () {
                    return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
                }
            },
            fix: {
                type: Boolean,
                default: false
            },
            fullscreen: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                showText: false,
                // used for $Spin
                visible: false
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.size}`]: !!this.size,
                        [`${prefixCls}-fix`]: this.fix,
                        [`${prefixCls}-show-text`]: this.showText,
                        [`${prefixCls}-fullscreen`]: this.fullscreen
                    }
                ];
            },
            mainClasses () {
                return `${prefixCls}-main`;
            },
            dotClasses () {
                return `${prefixCls}-dot`;
            },
            textClasses () {
                return `${prefixCls}-text`;
            },
            fullscreenVisible () {
                if (this.fullscreen) {
                    return this.visible;
                } else {
                    return true;
                }
            }
        },
        watch: {
            visible (val) {
                if (val) {
                    this.addScrollEffect();
                } else {
                    this.removeScrollEffect();
                }
            }
        },
        mounted () {
            this.showText = this.$slots.default !== undefined;
        }
    };
</script>
<style >
.ivu-spin{color:#2d8cf0;vertical-align:middle;text-align:center}
.ivu-spin-dot{position:relative;display:block;border-radius:50%;background-color:#2d8cf0;width:20px;height:20px;-webkit-animation:ani-spin-bounce 1s 0s ease-in-out infinite;animation:ani-spin-bounce 1s 0s ease-in-out infinite}
.ivu-spin-large .ivu-spin-dot{width:32px;height:32px}
.ivu-spin-small .ivu-spin-dot{width:12px;height:12px}
.ivu-spin-fix{position:absolute;top:0;left:0;z-index:8;width:100%;height:100%}
.ivu-spin-fullscreen{z-index:9999}
.ivu-spin-fullscreen-wrapper{position:fixed;top:0;right:0;bottom:0;left:0}
.ivu-spin-fix .ivu-spin-main{position:absolute;top:50%;left:50%;-ms-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}
.ivu-spin-fix .ivu-spin-dot{display:inline-block}
.ivu-spin-show-text .ivu-spin-dot,.ivu-spin-text{display:none}
.ivu-spin-show-text .ivu-spin-text{display:block}
.ivu-table-wrapper>.ivu-spin-fix{
    border:1px solid #dcdee2;
    border-top:0;border-left:0}
    @-webkit-keyframes ani-spin-bounce{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}@keyframes ani-spin-bounce{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}.ivu-alert{position:relative;padding:8px 48px 8px 16px;border-radius:4px;color:#515a6e;font-size:12px;line-height:16px;margin-bottom:10px}
</style>
