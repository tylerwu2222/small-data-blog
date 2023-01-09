const checkboxGroup = (selection,props) => {
    const {
        values,
        onValueChanged,
        checkedValues,
        checkbox_class
    } = props; // destructure/unpack props into options

    // create checkboxes
    let checkbox_groups = selection.selectAll('g')
        .data(values)
        .enter()
        .append('g').attr('class', 'checkbox-group')
    checkbox_groups
        .append('label')
            .attr('for',d => d + '-checkbox')
            .text(d => d)
            .attr('class','checkbox-label')
        .append('input')
            .attr('checked',d => {
                if(checkedValues.includes(d)){
                    return true;
                }
            })
            .attr('type','checkbox')
            .attr('id', d => d + '-checkbox')
            .attr('value',d => d)
            .attr('class',checkbox_class)
        .merge(checkbox_groups)
            .on('change', function(){ // when select changed...
                onValueChanged(this.value); // executes code in scatter_src
            }); // enter/update

};

export default checkboxGroup;