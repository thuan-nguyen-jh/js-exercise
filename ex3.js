const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function prompt(question) {
    return new Promise((resolve, reject) => {
        rl.question(question, resolve)
    });
}

class Node {
    id;
    text;

    constructor(id, text) {
        this.id = id;
        this.text = text;
    }

    toString() {
        throw new Error("Not implemented");
    }
}

class Question extends Node {
    answers = {};

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
}

class Conclusion extends Node {
    constructor(id, text) {
        super(id, text);
    }

    toString() {
        return this.text;
    }
}

class QuestionTree {
    beginNodeId;
    nodes = {};

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

    async travel(validate = false) {
        if (validate) {
            this.validate();
        }

        let nodeId = this.beginNodeId;
        while (true) {
            const node = this.node(nodeId);
            const option = await prompt(node.toString());

            if (node instanceof Conclusion) {
                rl.close();
                break;
            }
            nodeId = node.getNext(option);
        }
        return;
    }
}

const tree = new QuestionTree();
tree.add(new Question('start', 'Do you have free time?', ['Yes', 'chocolate'], ['No', 'milk']));
tree.add(new Question('chocolate', 'Do you like chocolate?', ['Yes', 'love_chocolate'], ['No', 'milk']));
tree.add(new Question('milk', 'Do you like milk?', ['Yes', 'love_milk'], ['No', 'nothing']));
tree.add(new Conclusion('love_chocolate', 'You are a chocolate lover!'));
tree.add(new Conclusion('love_milk', 'You are a milk lover!'));
tree.add(new Conclusion('nothing', 'You are a nothing!'));
tree.setBeginNode('start');

tree.node('start').addAnswer('Not sure', 'nothing');
tree.node('start').removeAnswer('No');

tree.node('chocolate').answers['No'] = 'nothing';
tree.remove('milk');

tree.travel(true);