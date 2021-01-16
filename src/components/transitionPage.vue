<template>
    <div id="tp">

    </div>
</template>

<script>
export default {
    name: 'tp',
    created(){
        this.$axios.get('/user/checkLogin')
        .then(res => {
            if(res.data !== 'login'){
                this.$router.push('/index')
            }else{
                this.$router.push('/backstage')
            }
        })
    }
}
</script>