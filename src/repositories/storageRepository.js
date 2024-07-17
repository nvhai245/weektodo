export default {
    get(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    set(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
        localStorage.setItem("lastUpdated", Date.now());
    },
    remove(key) {
        localStorage.removeItem(key);
        localStorage.setItem("lastUpdated", Date.now());
    },
    clean(){
        localStorage.clear();
        localStorage.setItem("lastUpdated", Date.now());
    },
    as_json(){
        var values = {}, keys = Object.keys(localStorage), i = keys.length;
        while (i--) {
            values[keys[i]] = localStorage.getItem(keys[i]);
        }
        return values;
    },
    load_json(data){
        localStorage.setItem('config',data['config'])
        localStorage.setItem('customTodoListIds',data['customTodoListIds'])
        localStorage.setItem("lastUpdated", Date.now());
    },
};
