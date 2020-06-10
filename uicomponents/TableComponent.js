export class TableComponent {
    constructor() {}

    renderTable(aItems, fnColumnNameClickCallback) {
        //console.log(aItems)
        //Store column names in an array
        var tableHeads = [];
        for (var i = 0; i < aItems.length; i++) {
            for (var key in aItems[i]) {
                if (tableHeads.indexOf(key) === -1) {
                    tableHeads.push(key);
                }
            }
        }

        //Create table
        this.oDomRef = document.createElement("table");

        //Create header row
        var tr = this.oDomRef.insertRow(-1);
        for (var i = 0; i< tableHeads.length; i++) {
            var th = document.createElement("th");
            th.innerHTML = tableHeads[i];
            //th.setAttribute('data-target', tableHeads[i])
            th.addEventListener('click', fnColumnNameClickCallback);
            tr.appendChild(th)
        }
        
        //Add data rows to the table
        for (var i = 0; i < aItems.length; i++) {

            tr = this.oDomRef.insertRow(-1)

            for (var j = 0; j < tableHeads.length; j++) {
                var tableCell = tr.insertCell(-1);
                tableCell.innerHTML = aItems[i][tableHeads[j]];
            }
        }

        return this.oDomRef;
    }
}