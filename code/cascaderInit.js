$(function(){
    var demo = new createCascader({
        contentBox: '#selectCascader',
        data: [
            {
                label: '数学',
                value: 'math',
                children: [
                    {
                        label: '离散数学',
                        value: 'lsMath',
                        children: [
                            {
                                label: '离散数学1',
                                value: 'lsMath1',
                                children: [
                                    {
                                        label: '离散数学1-1',
                                        value: 'lsMath1-1'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '微积分',
                        value: 'wjf',
                    },
                    {
                        label: '立体几何',
                        value: 'ltjh',
                    }
                ]
            },
            {
                label: '语文',
                value: 'chinese',
                children: [
                    {
                        label: '唐诗',
                        value: 'ts',
                        children: [
                            {
                                label: '悯农',
                                value: 'nm'
                            },
                            {
                                label: '鹅鹅鹅',
                                value: 'eee'
                            }
                        ]
                    },
                    {
                        label: '宋词',
                        value: 'sc',
                        children: [
                            {
                                label: '水调歌头',
                                value: 'sdgt'
                            },
                            {
                                label: '如梦令',
                                value: 'rml'
                            }
                        ]
                    }
                ]
            }
        ],
        initValue: [0,0,0,0],
        width: 300,
        height: 485,
        titleArr: ['选择科目', '选择专业', '选择类型', '选择课时'],
        valueArr: [],
        labelArr: [],
        activeColor: '#409eff'
    })
    $('#tijiao').click(function(){
        console.log(demo.data);
    })
})
