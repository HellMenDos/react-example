class ElementClass {
    constructor(tagName,className,data,onClick) {
        this.className = className
        this.data = data
        this.onClick = onClick
        this.tagName = tagName
    }

    render(containerClass) {
        const element = document.createElement(this.tagName)
        element.classList.add(this.className);
        element.innerText = this.data
        element.onclick = () => {
            if(typeof this.onClick == 'function') this.onClick();
        }

        document.getElementById(containerClass).appendChild(element)
    }

    rerender(text) {
        document.getElementsByClassName(this.className)[0].innerHTML = text
    }
}

class HtmlLayout {
    elements = {}
    constructor() {}

    createElem(tagName,data,{ className,containerClass, onClick }) {
        const element = this.elements[className]
        
        if(data != element?.data) {
            if(element) {
                element.rerender(data)
            }else {
                let elem = new ElementClass(tagName,className,data,onClick)
                this.elements[className] = elem
                elem.render(containerClass)
            }
        }
    }
    element(tagName,data,{ className,containerClass, onClick }) {

        if(typeof data == 'function') {
            data()
        }else {
            this.createElem(tagName,data,{ className,containerClass, onClick })
        }
    }
}


class Index extends HtmlLayout  {
    promises = []
    data = 0;
    posts = []

    constructor() {
        super()
        
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((value) => {
            this.posts = [...value]
            this.render()
        })
    }

    increment = () => {
        this.data++;
        this.render()
    }
    decriment = () => {
        this.data--;
        this.render()
    }

    render() {
        return this.element('div',() => {
            
            this.element('div',`Count ${this.data}`, { 
                className:"UniqClass",
                containerClass:"root",
                onClick: null
            })
            this.element('button','Increment', { 
                className:"Increment",
                containerClass:"root",
                onClick: this.increment
            })
            this.element('button','Decriment', { 
                className:"Decriment",
                containerClass:"root",
                onClick: this.decriment
            })


        },{ 
            className:"UniqClass2",
            containerClass:"root",
            onClick: null
        })
    }
}

new Index().render()