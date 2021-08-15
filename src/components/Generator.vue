<template>
    <div class="generator">
        <h1>Password Generator</h1>
        <h3 class="text-link text-noselect" v-on:click="toggleHidden($event)">Number padding settings <span class="arrow arrow-down"></span></h3>
        <div class="generator-options hidden">
            <div class="generator-option">
                <label>Number padding left</label>
                <input v-model="options.numPadding.left" type="number">
            </div>
            <div class="generator-option">
                <label>Number padding right</label>
                <input v-model="options.numPadding.right" type="number">
            </div>
            <div class="generator-option">
                <label>Number padding chars</label>
                <input v-model="options.numPadding.paddingChars" type="text">
            </div>
        </div>
        <h3 class="text-link text-noselect" v-on:click="toggleHidden($event)">Char padding settings <span class="arrow arrow-down"></span></h3>
        <div class="generator-options hidden">
            <div class="generator-option">
                <label>Char padding left</label>
                <input v-model="options.charPadding.left" type="number">
            </div>
            <div class="generator-option">
                <label>Char padding right</label>
                <input v-model="options.charPadding.right" type="number">
            </div>
            <div class="generator-option">
                <label>Char padding chars</label>
                <input v-model="options.charPadding.paddingChars" type="text">
            </div>
        </div>
        <h3 class="text-link text-noselect" v-on:click="toggleHidden($event)">Word settings <span class="arrow arrow-down"></span></h3>
        <div class="generator-options hidden">
            <div class="generator-option">
                <label>Word count</label>
                <input v-model="options.words.count" type="number">
            </div>
            <div class="generator-option">
                <label>Word minimum length</label>
                <input v-model="options.words.minLen" type="number">
            </div>
            <div class="generator-option">
                <label>Word maximum length</label>
                <input v-model="options.words.maxLen" type="number">
            </div>
            <div class="generator-option">
                <label>Word random capitalization</label>
                <input v-model="options.words.randomCaps" type="number">
            </div>
        </div>
        <h3 class="text-link text-noselect" v-on:click="toggleHidden($event)">Separator settings <span class="arrow arrow-down"></span></h3>
        <div class="generator-options hidden">
            <div class="generator-option">
                <label>Separator chars</label>
                <input v-model="options.seperator.seperatorChars" type="text">
            </div>
            <div class="generator-option">
                <label>Separator random</label>
                <input v-model="options.seperator.random" type="text">
            </div>
        </div>
        <h3 class="text-link text-noselect" v-on:click="toggleHidden($event)">Char insertion settings <span class="arrow arrow-down"></span></h3>
        <div class="generator-options hidden">
            <div class="generator-option">
                <label>Insertion chars</label>
                <input v-model="options.insertion.insertionChars" type="text">
            </div>
            <div class="generator-option">
                <label>Insertion count</label>
                <input v-model="options.insertion.count" type="number">
            </div>
        </div>

        <a class="button button-fluid" v-on:click="generateMany(3)">Regenerate</a>
        <p class="generator-output" v-for="output in outputs" v-bind:key="output">
            <span v-on:click="select($event)">{{ output }}</span>
        </p>
    </div>
</template>

<style lang="scss">
    @import "../assets/scss/main.scss";
</style>

<script>
    import generator from '@/assets/js/generator'
    import words from 'raw-loader!@/assets/dict.txt'

    export default {
        name: 'Generator',
        data (){
            return{
                options: {
                    words: {
                        count: 4,
                        minLen: 5,
                        maxLen: 8,
                        randomCaps: 1
                    },
                    seperator: {
                        seperatorChars: "-_.,",
                        random: false
                    },
                    charPadding: {
                        paddingChars: "!?-:;.,_",
                        left: 0,
                        right: 2,
                        random: true
                    },
                    numPadding: {
                        paddingChars: "0123456789",
                        left: 2,
                        right: 0,
                        random: true
                    },
                    insertion: {
                        insertionChars: "!@#$%^&*():{;['/?.><,",
                        count: 1
                    }
                },
                outputs: [],
                words
            }
        },
        methods: {
            generate: function(options){
                return generator.generate(this.words, JSON.parse(JSON.stringify(options)))
            },
            generateMany: function(amount){
                this.outputs = []

                for(let i = 0; i < amount; i++){
                    let password = this.generate(this.options)
                    this.outputs.push(password)
                }
            },
            toggleHidden: function(event){
                let elem = event.target
                
                if(elem.nodeName == "SPAN"){
                    elem = elem.parentNode
                }
                
                elem = elem.nextSibling

                if(elem.classList.contains("hidden")){
                    elem.classList.remove("hidden")
                }else{
                    elem.classList.add("hidden")
                }
            },
            select: function(event){
                let elem = event.target

                if (document.body.createTextRange) {
                    const range = document.body.createTextRange()
                    range.moveToElementText(elem)
                    range.select()
                } else if (window.getSelection){
                    const selection = window.getSelection();
                    const range = document.createRange();
                    range.selectNodeContents(elem);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
        },
        mounted: function(){
            this.words = words.replace("\r\n", "\n").split("\n")

            this.generateMany(3)
        }
    }
</script>