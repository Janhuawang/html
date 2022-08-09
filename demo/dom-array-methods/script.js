// 通过dom获取标签对象
const main = document.getElementById('main');
const addClick = document.getElementById('add');
const doubleClick = document.getElementById("double");
const maxClick = document.getElementById("max");
const sortClick = document.getElementById("sort");
const totalClick = document.getElementById("total");
  
// 定义一个数据结构
// let： 1声明的变量不能提升，
//       2代码会自上而下的检查代码必须在声明之后使用 
//       3阻断了与window的关系不会成为window对象的属性
let data = [];


// 具体方法函数
function onAdd(){
    console.log("点击事件:","onAdd");
    userBen = {
        name: "小刚",
        number:  Math.floor(Math.random() * 1000)
    }

    data.push(userBen);
    updateDom();
}

// 更新dom加载器
function updateDom(){
    main.innerHTML = '';
    data.forEach(
        item => {
           const element = document.createElement("div");
           element.classList.add("user");
           element.innerHTML = `<h2><strong>${item.name} ${formatNumber(item.number)} </strong></h2>`
           main.appendChild(element)
        }
    );
}

// 格式转换
function formatNumber(number){
    return `编号: ${number}`;
}

// reduce 参考：https://blog.csdn.net/weixin_44447255/article/details/121649040 
// 高阶函数：数组遍历转化，接收一个function(total,currentValue,currentKey,arr),initValue
// total,currentValues 为必填字段
// currentKey,arr 为可选字段
// initValue为初始化字段 ，初始化会给到total,如果没有即为index=0,current作为index=1开始。
function onDouble(){
    console.log("点击事件:","onDouble");
    // data = data.reduce((total,currentV,currentIndex)=>{
    //     total[currentIndex].number = currentV.number * 2;
    //     // return total;
    // },data);

    // 如果没有初始化值时  
     data.reduce((total,currentV,currentIndex,arr)=>{
        if(arr.includes(total)){
            total.number*=2;
        } 
        currentV.number*=2;
    });

    // total第一次时index为0的，其次为return回来的，从index=1开始，所以遍历次数=size-1
    // data.reduce((total,currentV,currentIndex,arr)=>{
    //     console.log("调试:",`${total.number}`);
    //     return currentV;
    // });

    updateDom();
}

// 获取最大的数
function onMax(){
    console.log("点击事件:","onMax");
    o = data.reduce((first,currentV)=>{
        if(first.number > currentV.number){
            return first;
        }else{
            return currentV;
        }
    });
    
    data.splice(0);
    data.push(o);
    console.log(`对象为 ${o.number}`);

    updateDom();
}

// 从小到大排序
function onSort(){
    console.log("点击事件:","onSort");

    data = data.sort((f,t)=>{
       return f.number - t.number;
    });

    updateDom();
}

/// 获取总数
function onTotal(){
    total = data.reduce((f,c)=>{
        console.log(`f.number: ${f.number}`,`c.number: ${c.number}`);
        return {number:f.number+c.number,name:"小刚刚"};
    });
    
    data.splice(0);
    data.push(total);
    // main.innerHTML = `<h2><strong>${total.number}</strong></h2>`;
    updateDom();
}

// 给标签对象添加点击事件
addClick.addEventListener("click",onAdd);
doubleClick.addEventListener("click",onDouble);
maxClick.addEventListener("click",onMax);
sortClick.addEventListener("click",onSort);
totalClick.addEventListener("click",onTotal);

