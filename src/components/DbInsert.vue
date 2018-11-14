<template>
    <div class="dbinsert">
        <h2 style="cursor: pointer;" @click="showWindow = !showWindow">DB Insert <span v-if="!showWindow">▼</span><span v-else>▲</span></h2>
        <div v-if="showWindow" class="dbStoreKeyword">
            <div>
                <label><input v-model="dbStoreKeyword" value="전체" type="radio" />전체</label>
            </div>
            <div>
                <label><input v-model="dbStoreKeyword" value="T와이파이존" type="radio" />T와이파이존</label>
                <label><input v-model="dbStoreKeyword" value="목욕탕" type="radio" />목욕탕</label>
                <label><input v-model="dbStoreKeyword" value="숙박" type="radio" />숙박</label>
                <label><input v-model="dbStoreKeyword" value="쇼핑" type="radio" />쇼핑</label>
                <label><input v-model="dbStoreKeyword" value="관공서" type="radio" />관공서</label>
                <label><input v-model="dbStoreKeyword" value="주요시설물" type="radio" />주요시설물</label>
                <label><input v-model="dbStoreKeyword" value="은행" type="radio" />은행</label>
                <label><input v-model="dbStoreKeyword" value="ATM" type="radio" />ATM</label>
                <label><input v-model="dbStoreKeyword" value="편의점" type="radio" />편의점</label>
                <label><input v-model="dbStoreKeyword" value="미용실" type="radio" />미용실</label>
                <label><input v-model="dbStoreKeyword" value="이발소" type="radio" />이발소</label>
                <label><input v-model="dbStoreKeyword" value="대형마트" type="radio" />대형마트</label>
                <label><input v-model="dbStoreKeyword" value="화장실" type="radio" />화장실</label>
                <label><input v-model="dbStoreKeyword" value="공원" type="radio" />공원</label>
                <label><input v-model="dbStoreKeyword" value="커피" type="radio" />커피</label>
                <label><input v-model="dbStoreKeyword" value="음식" type="radio" />음식</label>
                <label><input v-model="dbStoreKeyword" value="레저" type="radio" />레저</label>
                <label><input v-model="dbStoreKeyword" value="호텔" type="radio" />호텔</label>
                <label><input v-model="dbStoreKeyword" value="마트" type="radio" />마트</label>
            </div>
            <div>
                <label><input v-model="dbStoreKeyword" value="식음료" type="radio" />식음료</label>
                <label><input v-model="dbStoreKeyword" value="TV맛집" type="radio" />TV맛집</label>
                <label><input v-model="dbStoreKeyword" value="카페" type="radio" />카페</label>
                <label><input v-model="dbStoreKeyword" value="한식" type="radio" />한식</label>
                <label><input v-model="dbStoreKeyword" value="중식" type="radio" />중식</label>
                <label><input v-model="dbStoreKeyword" value="일식" type="radio" />일식</label>
                <label><input v-model="dbStoreKeyword" value="양식" type="radio" />양식</label>
                <label><input v-model="dbStoreKeyword" value="패밀리레스토랑" type="radio" />패밀리레스토랑</label>
                <label><input v-model="dbStoreKeyword" value="전문음식점" type="radio" />전문음식점</label>
                <label><input v-model="dbStoreKeyword" value="피자" type="radio" />피자</label>
                <label><input v-model="dbStoreKeyword" value="치킨" type="radio" />치킨</label>
                <label><input v-model="dbStoreKeyword" value="디저트" type="radio" />디저트</label>
                <label><input v-model="dbStoreKeyword" value="제과점" type="radio" />제과점</label>
                <label><input v-model="dbStoreKeyword" value="베스킨라빈스" type="radio" />베스킨라빈스</label>
                <label><input v-model="dbStoreKeyword" value="하겐다즈" type="radio" />하겐다즈</label>
                <label><input v-model="dbStoreKeyword" value="나뚜루" type="radio" />나뚜루</label>
                <label><input v-model="dbStoreKeyword" value="콜드스톤" type="radio" />콜드스톤</label>
                <label><input v-model="dbStoreKeyword" value="패스트푸드" type="radio" />패스트푸드</label>
            </div>
            <div>
                <label><input v-model="dbStoreKeyword" value="교통" type="radio" />교통</label>
                <label><input v-model="dbStoreKeyword" value="버스" type="radio" />버스</label>
                <label><input v-model="dbStoreKeyword" value="버스정류장" type="radio" />버스정류장</label>
                <label><input v-model="dbStoreKeyword" value="지하철" type="radio" />지하철</label>
                <label><input v-model="dbStoreKeyword" value="주유소" type="radio" />주유소</label>
                <label><input v-model="dbStoreKeyword" value="충전소" type="radio" />충전소</label>
                <label><input v-model="dbStoreKeyword" value="주차장" type="radio" />주차장</label>
                <label><input v-model="dbStoreKeyword" value="정비소" type="radio" />정비소</label>
                <label><input v-model="dbStoreKeyword" value="EV충전소" type="radio" />EV충전소</label>
                <label><input v-model="dbStoreKeyword" value="EV" type="radio" />EV</label>
                <label><input v-model="dbStoreKeyword" value="가스충전소" type="radio" />가스충전소</label>
            </div>
            <div>
                <label><input v-model="dbStoreKeyword" value="병원" type="radio" />병원</label>
                <label><input v-model="dbStoreKeyword" value="약국" type="radio" />약국</label>
                <label><input v-model="dbStoreKeyword" value="내과" type="radio" />내과</label>
                <label><input v-model="dbStoreKeyword" value="소아과" type="radio" />소아과</label>
                <label><input v-model="dbStoreKeyword" value="외과" type="radio" />외과</label>
                <label><input v-model="dbStoreKeyword" value="치과" type="radio" />치과</label>
                <label><input v-model="dbStoreKeyword" value="안과" type="radio" />안과</label>
                <label><input v-model="dbStoreKeyword" value="의원" type="radio" />의원</label>
                <label><input v-model="dbStoreKeyword" value="보건소" type="radio" />보건소</label>
                <label><input v-model="dbStoreKeyword" value="한의원" type="radio" />한의원</label>
            </div>
            <div>
                <label><input v-model="dbStoreKeyword" value="놀거리" type="radio" />놀거리</label>
                <label><input v-model="dbStoreKeyword" value="영화관" type="radio" />영화관</label>
                <label><input v-model="dbStoreKeyword" value="노래방" type="radio" />노래방</label>
                <label><input v-model="dbStoreKeyword" value="PC방" type="radio" />PC방</label>
                <label><input v-model="dbStoreKeyword" value="공연장" type="radio" />공연장</label>
                <label><input v-model="dbStoreKeyword" value="문화시설" type="radio" />문화시설</label>
                <label><input v-model="dbStoreKeyword" value="스크린골프장" type="radio" />스크린골프장</label>
            </div>
        </div>
        <div v-if="showWindow" class="btn absolute" @click="onInsert()">디비에 저장</div>
    </div>
</template>

<script>
import Btn from "./Btn";
export default {
    data(){
        return{
            dbStoreKeyword: null,
            showWindow: false
        }
    },
    methods: {
        onInsert(){
            // this.eventBus.$emit('inputKeyword', this.dbStoreKeyword, 999);
            this.eventBus.$emit('getTotPOISearch', this.dbStoreKeyword);
        }
    }
};
</script>

<style lang="scss" scoped>
.dbinsert{
    width: 800px;
    background-color: white;
    border: 1px solid #eaeaea;
}
.dbStoreKeyword{
    text-align: left;
    & > div{
        padding: 10px 10px;
        border-top: 1px solid grey;
        & label{
            display: inline-block;
        }
    }
}
.btn {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    width: 350px;
    line-height: 50px;
    background-color: #5fc694;
    color: white;
    font-size: 20px;
    border: 1px solid #eaeaea;
}
.btn:hover{
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
.btn:active{
    background-color: #598b73;
}
</style>
