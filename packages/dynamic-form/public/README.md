# Release Note - Passive Local GUI

[TOC]

* * *

## 1. MOPassive-1.9.1.0
- 版本号明细: MOPassive-1.9.1.0+build.12161841
- 更新时间: 2022年12月16日
- 改进
    - 重新梳理了材料库功能，使之逻辑更清晰。划分出project库、支持了csv格式的导出、材料列表置顶功能等内容
    - 优化了Object Tree的显示效果，使得层级关系更明显
    - 优化CAD建模中非矩形波导各类结构的建模操作，以及结构图标、Object颜色、source/monitor与结构相对位置等内容
    - 优化Output View 的呈现效果
    - 优化变量弹窗，根据用户输入不存在的变量时，弹出新建变量弹窗
    - 优化FDE，模式数据导出
    - 优化EME，propagation and wavelength sweep by solver
    - 全局参数的优化
    - FDE/EME/FDTD的仿真进度信息优化
- 新增功能
    - 材料库的material user与project库支持多种拟合（用于FDE/EME）。
    - Object Tree 通过【Hide】复选框可以显示和隐藏对应材料的结构，以及支持快速过滤的下拉框。
    - CAD建模用到的测量尺功能（平面内点拉测量及点线面测量），以及可更改working plane及对应grid/span
    - 支持Import GDS
    - 回显支持绘制数据导出及场全部数据导出
    - FDTD支持symmetry/anti-symmetry边界条件(含源适配）
    - FDE新增global sweep、dispersive material support、overlap、far-field等特性
    - Structures/FDTD/FDE/EME支持Material-添加Index输入框，并支持输入变量及其表达式
- 修正
    - 全页面字体统一
    - CAD界面中的的结构光照
    - CAD的入射源/port箭头指示方向
    - Object  Tree中Project字段名称应变为当前的工程文件名称
- 错误修复
    - 修复打开transform弹窗，控制台报错
    - 修复关闭软件，不提示保存工程
    - 修复eme 模型运行失败
    - 修复任务被删除后，重新发起任务，提示任务需要等待
    - 修复折射率监视器设置后，在GUI里没有回显结果
    - 修复查看历史结果时，result tree中显示最新运行的结果，实际上查看的是历史结果
    - 修复导入 gds 时报错
    - 修复cad画布大小输入5000000时，软件崩溃
    - 修复cad关掉show grid，坐标轴消失
    - 修复工程文件导出后缀重复两个passive
    - 修复EME  Sweep  Propagation数据无法导出
    - 修复transform平移时，勾选copy，点击ok，新模型与原模型重合
    - 修复两个 Arc Waveguide 3D 重叠时，在 CAD 中无法选中
    - 修复mode source-Export Monitor Data（csv）数据导出格式错误
    - 修复eme view data数据缺失
    - 修复fde-FDE: symmetry/anti-symmetry下，dividling line绘制错误
    - 修复fde analysis数据导出格式错误
    - 修复材料导出的wavelength数据数量级错误
    - 修复关闭工程，历史任务还在
    - 修复FDE对称/反对称边界下，局部mesh加密后，场值不对称
    - 修复FDE PML的默认值出错，layers应该是12
    - 修复运行eme propagation和wavelength sweep时需要取消运行eme monitor
    - 修复删除material-project的仅有的一条数据时没有任何的提示
    - 修复eme回显结果，mode field的回显打开custom range时，回显图空白

## 2. MOPassive-2.0.0.0

- 版本号明细: MOPassive-2.0.0.0+build.01051749
- 更新时间: 2023年01月05日
- 改进
    - 优化材料库中颜色选择为有限色块
    - 优化材料默认颜色规则
    - 优化按钮颜色显示
    - 优化对话框弹窗中行距间隔
    - 优化GDS文件导入后的Polygon数量
    - 优化Monitor的Name长度限制为64位
    - 优化FDE及EME网格设置为Global Mesh Uniform Grid
    - 增加FDE及EME中Grating Fator的鼠标悬停提示
- 新增功能
    - 在View中增加Option, 方便用户自定义设置Source/Port/Monitor等的边框及颜色
    - 在项目树中的FDE, ModeSource, FDTDPort, ModeExpansion, EMEPort等增加右键菜单, 方便FDE Analysis
- 修正
    - 修正IndexMonitor未继承父仿真的网格设置
    - 修正FDTD在ModeSource处解模触发3D Mesh
- 错误修复
    - CAD显示中XY Window方向显示错误
    - FDTD在ModeSource/Port处以及EME在Port/Cell处查看解模结果坐标显示错误

## 3. MOPassive-2.0.0.1

- 版本号明细: MOPassive-2.0.0.1+build.01101904
- 更新时间: 2023年01月10日
- 改进
    - 优化仿真过程中进行结果查看时Tunnel Breakoff的错误
    - 增加安装软件后重启计算机的提示
- 新增功能
    - 无
- 修正
    - 修正无源软件占用有源软件授权数量
- 错误修复
    - 修复FDE FarField结果显示错误

## 4. MOPassive-2.1.0.0

- 版本号明细: MOPassive-2.1.0.0+build.02101811-setup
- 更新时间: 2023年02月10日
- 改进
  - 优化CAD中ModeSource/Monitor/Port的Border显示效果
  - 优化选中Structure对象后突出效果显示
  - 优化强度图类型结果回显坐标取整
- 新增功能
  - 增加对LocalGUI/SDK历史仿真结果导入查看的功能(FDTD ModeInfo/EME Sweep SMatrix/FDE Parameter Sweep部分结果查看不支持)
  - 增加GDS文件导入时进行梯形拉伸的支持
  - 增加FDE Overlap中D-Card选择不同仿真工程结果的支持
- 修正
  - EME SMatrix结果小数位数保留至10位
- 错误修复
  - 无
