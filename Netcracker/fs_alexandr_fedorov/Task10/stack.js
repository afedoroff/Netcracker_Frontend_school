class Stack{
    stack = [];

    add(value){
        this.stack.push(value);
    }

    remove(){
        return this.stack.pop();
    }

    get length(){
        return this.stack.length;
    }

    get top(){
        return this.stack[this.length - 1];
    }
}