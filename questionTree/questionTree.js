class Node {
    element;
    id;
    text;

    constructor(id, text) {
        this.id = id;
        this.text = text;
    }

    toString() {
        throw new Error("Not implemented");
    }

    generateElement() {
        if (this.element === undefined) {
            this.element = document.createElement("div");
            const textElement = document.createElement('p');
            textElement.innerText = this.text;
            this.element.appendChild(textElement);
        }

        return this.element;
    }

    static constructData(data) {
        if (data.answers === undefined) {
            return Object.assign(new Conclusion(), data);
        } else {
            return Object.assign(new Question(), data);
        }
    }
}

class Question extends Node {
    answers = {};
    answersElement = [];

    constructor(id, question, ...answers) {
        super(id, question);
        answers.forEach((answer) => this.addAnswer(...answer));
    }

    get question() {
        return this.text;
    }

    set question(question) {
        this.text = question;
    }

    addAnswer(option, nextQuestionId) {
        this.answers[option] = nextQuestionId;
    }

    removeAnswer(option) {
        delete this.answers[option];
    }

    getNext(option) {
        return this.answers[option];
    }

    toString() {
        const resultString = Object.keys(this.answers).join('/');
        return `${this.question} (${resultString})`;
    }

    generateElement(onClick) {
        if (this.element === undefined) {
            this.element = super.generateElement();
            Object.keys(this.answers).forEach((answer) => {
                const answerElement = document.createElement('button');
                answerElement.innerText = answer;
                answerElement.dataset.next = this.answers[answer];
                answerElement.addEventListener('click', onClick);
            
                this.answersElement.push(answerElement);
                this.element.appendChild(answerElement);
            });
        } else {
            this.answersElement.forEach((answerElement) => {
                answerElement.disabled = false;
            });
        }

        return this.element;
    }
}

class Conclusion extends Node {
    constructor(id, text) {
        super(id, text);
    }

    toString() {
        return this.text;
    }
}

export default class QuestionTree {
    container;

    beginNodeId;
    currentNode;
    nodes = {};

    constructor(data, container) {
        this.constructData(data);
        this.container = container;
    }

    constructData(data) {
        this.beginNodeId = data.beginNodeId;
        Object.keys(data.nodes).forEach((key) => {
            this.nodes[key] = Node.constructData(data.nodes[key]);
        });
    }

    add(node) {
        this.nodes[node.id] = node;
    }

    remove(id) {
        if (this.isHaveNode(id)) {
            if (this.beginNodeId === id) {
                this.beginNodeId = undefined;
            }

            delete this.nodes[id];
        }
    }

    node(id) {
        return this.nodes[id];
    }

    setBeginNode(id) {
        if (this.isHaveNode(id)) {
            this.beginNodeId = id;
        } else {
            throw new Error("Node not found");
        }
    }

    isHaveNode(id) {
        return this.nodes[id] !== undefined;
    }

    isHaveValidBeginNode() {
        return this.isHaveNode(this.beginNodeId);
    }

    isHaveValidAnswer(id) {
        const node = this.node(id);
        if (node instanceof Question) {
            const options = Object.keys(node.answers);
            return options.every((option) => this.isHaveNode(node.getNext(option)));
        }
        return true;
    }

    validate() {
        if (!this.isHaveValidBeginNode()) {
            throw new Error(`Begin node is invalid: ${this.beginNodeId}`);
        }

        Object.keys(this.nodes).forEach((id) => {
            if (!this.isHaveValidAnswer(id)) {
                throw new Error(`Question '${id}' have invalid next question`);
            }
        });
    }

    travel(nodeId = this.beginNodeId) {
        this.currentNode?.answersElement?.forEach((answerElement) => {
            answerElement.disabled = true;
        });

        this.currentNode = this.node(nodeId);
        const element = this.currentNode.generateElement((event) => {
            const nextNodeId = event.target.dataset.next;
            this.travel(nextNodeId);
        });
        this.container.appendChild(element);
    }

    restart() {
        this.container.innerHTML = '';
        this.travel();
    }
}