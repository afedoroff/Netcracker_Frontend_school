class Node {
    data;
    next;
    prev;

    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class List{
    head;
    tail;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    isEmpty(){
        return this.head == null;
    }

    addLast(data){
        let temp = new Node(data);
        if(this.isEmpty())
            this.head = temp;
        else
            this.tail.next = temp;
        temp.prev = this.tail;
        this.tail = temp;
    }

    addByIndex(data, index){
        let temp = new Node(data);
        let current = this.findByIndex(index);

        temp.prev = current.prev;
        current.prev = temp;
        temp.prev.next = temp;
        temp.next = current;
    }

    removeByIndex(index){
        let current = this.findByIndex(index);

        current.next.prev = current.prev;
        current.prev.next = current.next;
        current = null;
    }

    editByIndex(data, index){
        let current = this.findByIndex(index);
        current.data = data;
    }

    findByIndex(index){
        let current = this.head;
        let i = 0;
        while (current !== null && i !== index){
            current = current.next;
            i++;
        }
        return current;
    }


    print(){
        let temp = this.head;
        while (temp !== null){
            console.log(temp.data);
            temp = temp.next;
        }
    }
}