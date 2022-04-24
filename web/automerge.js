import * as Automerge from 'automerge'
window.addEventListener('load', () => {
    let doc1 = Automerge.init()  

    const ws = new WebSocket('ws://192.168.1.5:8082/test');
    ws.addEventListener("open", () => {
        console.log("we are connected")
    })
    ws.addEventListener("message", (evt) => {
        console.log("message recieved", evt.data)
        Automerge.merge(doc1, Automerge.load(evt.data))
    })
    doc1 = Automerge.change(doc1, doc => {
        doc.text = new Automerge.Text()
        doc.text.insertAt(0, "hello")
    })
    console.log("heheh", doc1.text.toString())
    document.querySelector('#input').addEventListener('change', function () {
        var newVal = doc1.text.toString().concat(this.value)
        Automerge.save(this.value)
        ws.send(newVal)
        console.log('You selected: ', this.value);
    });
    document.getElementById('input').innerHTML = doc1.text.toString()

})