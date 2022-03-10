class Banner{
    constructor(content, time, bannerHeight=64){
        this.content = content
        this.duration = time
        this.bannerHeight = bannerHeight
        this.spawnBanner()
    }

    async spawnBanner(){
        this.banner = document.createElement('div')
        this.banner.id = 'banner'
        this.banner.style = `width:100%; height:${this.bannerHeight}px; z-index:10; background-color:#ff3c3c; position:absolute;top:-${this.bannerHeight}px; left:0px; line-height:${this.bannerHeight}px; text-align:center; color:#fff; font-weight:bold; font-size:14px;`
        this.banner.innerHTML = this.content
        document.body.append(this.banner)
        await this.animateBannerDown()
        .then(()=>{
            this.removeBanner()
        })
    }

    animateBannerDown(){
        return new Promise((resolve, reject)=>{
            this.banner.style.top = '0px'
            this.banner.animate([
                {top: `-${this.bannerHeight}px`},
                {top: '0px'}
            ], {
                duration:500,
                iterations:1
            })
            setTimeout(()=>{
                resolve()
            }, 500)
        })
    }

    animateBannerUp(){
        return new Promise((resolve, reject)=>{
            this.banner.style.top = `-${this.bannerHeight}px`
            this.banner.animate([
                {top: '0px'},
                {top: `-${this.bannerHeight}px`}
            ], {
                duration:500,
                iterations:1
            })
            this.banner.style.top = `-${this.bannerHeight}px`
            setTimeout(()=>{
                resolve()
            }, 500)
        })
    }

    removeBanner(){
        setTimeout(async ()=>{
            await this.animateBannerUp()
            .then(()=>{
                this.banner.remove()
            })
        }, this.duration)
    }
}