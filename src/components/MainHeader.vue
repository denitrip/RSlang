<template>
  <header>
    <h2>Dictionary</h2>
    <table>
      <tr>
        <td rowspan="2"><img src="settings.png" alt="#" /></td>
        <td rowspan="2"><img src="chat.png" alt="#" /></td>
        <td>Ivan Ivanov</td>
        <td rowspan="2"><img src="img.png" alt="#" class="avatar" /></td>
      </tr>
      <tr>
        <td><span>Level 3</span></td>
      </tr>
    </table>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
  components: {},
};
</script>

<style>
header {
  margin-left: 40px;
  margin-right: 40px;
}

header > h2 {
  display: inline-block;
  font-weight: 900;
  margin: 0;
  padding: 0;
}

img {
  height: 20px;
  width: 20px;
}

.avatar {
  border-radius: 50%;
  height: 30px;
  width: 30px;
}

table {
  float: right;
  border-spacing: 10px 0px;
  margin-left: 40px;
  display: inline-block;
}

td span {
  font-size: 12px;
  opacity: 50%;
  font-weight: 100;
}
</style>
