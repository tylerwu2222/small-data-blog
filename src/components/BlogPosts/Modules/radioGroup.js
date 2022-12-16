const radioGroup = (selection,props) => {
    const {
        values,
        onValueChanged,
        checkedValue
    } = props; // destructure/unpack props into options

    // create radio
    let form = selection.append('form');
    let labels = form.selectAll('label').data(values);
   labels
        .enter()
        .append('label')
            .text(d => d/1000 + ' seconds')
            .attr('class','speed-label')
        .insert('input')
            .property('checked',d => checkedValue == d)
            .attr('type','radio')
            .attr('name', d => 'speed-btn')
            .attr('value',d => d)
            .attr('class','speed-radio')
        .merge(labels)
            .on('change', function(){ // when select changed...
                onValueChanged(+this.value); // executes code in scatter_src
            }); // enter/update

};

export default radioGroup;