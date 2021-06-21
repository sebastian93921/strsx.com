<template>
<section class="auto-type">
    <div class="typed-text" v-for="(history, index) in typeHistory" :key="index">
        <span v-html="history" />
    </div>
    <div class="typed-text">{{ typeValue }}
        <span v-if="!isFinish()" class="cursor">&nbsp;</span>
    </div>
</section> <!-- end auto-type -->
</template>



<script>
export default {
    name: 'auto-type',
    props: {
        typingSpeed:{
            type: Number,
            default: 10
        },
        newTextDelay: {
            type: Number,
            default: 1000
        },
        typeArray: {
            type: Array,
            required: true
        }
        
    },
    data: () => {
        return {
            typeHistory: [],
            typeValue: '',
            typeArrayIndex: 0,
            charIndex: 0,
        }
    },
    methods: {
      typeText() {
          if(this.typeArrayIndex < this.typeArray.length){
            this.typeValue += this.typeArray[this.typeArrayIndex].charAt(this.charIndex);
            this.charIndex += 1;
            setTimeout(this.typeText, this.typingSpeed);

            if(this.typeArray[this.typeArrayIndex].startsWith('/code/')){
                this.typeHistory.push(this.typeArray[this.typeArrayIndex].substr(6));
                this.charIndex = 0;
                this.typeArrayIndex += 1;
                this.typeValue = '';
            }else if(this.charIndex > this.typeArray[this.typeArrayIndex].length){
                if(this.typeArray[this.typeArrayIndex] === ''){
                    this.typeHistory.push('<br />');
                }else{
                    this.typeHistory.push(this.typeArray[this.typeArrayIndex]);
                }
                this.charIndex = 0;
                this.typeArrayIndex += 1;
                this.typeValue = '';
            }
          }else{
              this.$emit('FinishEvent')
          }
      },
      isFinish(){
        return this.typeArray.length == this.typeArrayIndex;
      }
    },
    created() {
        setTimeout(this.typeText, this.newTextDelay);
    },
    isFinish(){
        return this.typeArray.length == this.typeArrayIndex;
    }
}
</script>




<style scoped>


</style>
