window.onload = () => {
    console.log('Hello World');
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
    console.log(dropdownElementList);
    const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl));
    let prices = {};
    // fetch data
    const getPrices = (ville) => {
        fetch("/prix/"+ville).then(response => response.json()).then(data => {
            prices = data;
            as[current].click();
            console.log(prices);
        });
    }
    // getPrices();
    setInterval(getPrices, 10 * 60 * 1000);
    const aList = document.querySelectorAll('a');
    let current = "E10";
    const as = {};
    [...aList].forEach(aEl => {
        as[aEl.innerText] = aEl;
        aEl.addEventListener('click', (e) => {
            current = e.target.innerText;
            e.preventDefault();
            const href = aEl.innerText;
            const price = prices[href];
            const tableEL = document.getElementsByTagName("tbody")[0];
            tableEL.innerHTML = "";
            for (let i = 0; i < price.length; i++) {
                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");
                const d = price[i];
                td1.innerText = i+1;
                td2.innerText = d.price;
                td3.innerText = d.addr;
                td4.innerText = href;
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tableEL.appendChild(tr);
            }
        })
    });
    (() => {
        const elem = $("#search");
        elem.data('oldVal', elem.val);
        elem.bind("propertychange click keyup input paste", (event) => {

            if (event.type == "keyup" && event.key == "Enter") {
                getPrices(elem.val());
                console.log("ENTER");
            }
            if (elem.val() == "") {
                document.getElementById("autocomplete_re").innerHTML = "";
            }
            if (elem.data('oldVal') != elem.val() && elem.val() != "") {
                elem.data('oldVal', elem.val());
                console.log("okidokie");
                fetch(`/ville/search/${elem.val()}`).then(res => {
                    res.json().then(d => {
                        console.log(d);
                        document.getElementById("autocomplete_re").innerHTML = "";
                        for (let i = 0; i < d.length; i++) {
                            const a = document.createElement("a");
                            a.classList.add("btn", "btn-light");
                            a.onclick = () => {
                                elem.val(d[i]);
                                getPrices(d[i]);
                                document.getElementById("autocomplete_re").innerHTML = "";
                                as[current].click();
                            }
                            a.href = "#";
                            a.innerHTML = d[i].replace(new RegExp(elem.val(),"g"), `<b>${elem.val()}</b>`);
                            document.getElementById("autocomplete_re").appendChild(a);
                        }
                    })
                })
            }
        })
    })();

    // (() => {
    //     const ctx = document.getElementById('myChart').getContext("2d");
    //     fetch("/graphData").then(res => res.json()).then(d => {
    //         console.log(d);
    //         d["E10"].data
    //         const myChart = new Chart(ctx, Object.assign(d["E10"], {maintainAspectRatio: false, responsive: true, yAxes: [{stepSize: 100}]}));
    //         setTimeout(() => {
    //             myChart.resize(400, 500);
    //         },5000)
    //     })
    // })()
    // document.getElementsByTagName("input")[0].onchange = (e) => {
    //     // make a get request to /ville/search/:query
    //     // and log the result
    //     const query = e.target.value;
    //     fetch(`/ville/search/${query}`).then(response => response.json()).then(data => {
    //         console.log(data);
    //     });
    // }
}
