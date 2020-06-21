<template>
  <div class="dictionary" id="dictionaryPage">
    <div class="dictionary__tabs">
      <div class="dictionary__tab" :class="{ checked: isLernTab }" @click="toogleTab('lern')">
        <h3 class="tab-name">Learned words</h3>
        <div class="tab-line"></div>
      </div>
      <div
        class="dictionary__tab"
        :class="{ checked: isDifficultTab }"
        @click="toogleTab('difficult')"
      >
        <h3 class="tab-name">Difficult</h3>
        <div class="tab-line"></div>
      </div>
      <div class="dictionary__tab" :class="{ checked: isDeletedTab }" @click="toogleTab('deleted')">
        <h3 class="tab-name">Deleted</h3>
        <div class="tab-line"></div>
      </div>
    </div>
    <div class="dictionary__controls">
      <div class="dictionary__controls__checked">
        <b-form-checkbox class="" name="checkbox-checked-cards" size="lg">
          Selected 4 words
        </b-form-checkbox>
      </div>
      <div class="dictionary__controls__buttons">
        <button class="lern-btn">Learn</button>
        <button class="diff-btn">Difficult</button>
        <button class="del-btn">Deleted</button>
      </div>
    </div>
    <div class="dictionary__cards" v-if="isLernTab">
      <dictionary-card
        v-for="(card, i) in lernCards"
        :key="i"
        :englishWord="card.english"
        :russianWord="card.russian"
      ></dictionary-card>
    </div>
    <div class="dictionary__cards" v-if="isDifficultTab">
      <dictionary-card
        v-for="(card, i) in difficultCards"
        :key="i"
        :englishWord="card.english"
        :russianWord="card.russian"
      ></dictionary-card>
    </div>
    <div class="dictionary__cards" v-if="isDeletedTab">
      <dictionary-card
        v-for="(card, i) in deletedCards"
        :key="i"
        :englishWord="card.english"
        :russianWord="card.russian"
      ></dictionary-card>
    </div>
  </div>
</template>

<script>
import DictionaryCard from '../components/DictionaryCard.vue';

export default {
  name: 'DictionaryPage',
  data() {
    return {
      isLernTab: true,
      isDifficultTab: false,
      isDeletedTab: false,
      lernCards: [
        {
          english: 'strawberry1',
          russian: 'клубника2',
        },
        {
          english: 'strawberry2',
          russian: 'клубника2',
        },
        {
          english: 'strawberry3',
          russian: 'клубника3',
        },
      ],
      difficultCards: [
        {
          english: 'difficult1',
          russian: 'сложная1',
        },
        {
          english: 'difficult2',
          russian: 'сложная2',
        },
        {
          english: 'difficult3',
          russian: 'сложная3',
        },
        {
          english: 'difficult4',
          russian: 'сложная4',
        },
        {
          english: 'difficult5',
          russian: 'сложная5',
        },
      ],
      deletedCards: [
        {
          english: 'deleted1',
          russian: 'удаленная1',
        },
        {
          english: 'deleted2',
          russian: 'удаленная2',
        },
        {
          english: 'deleted3',
          russian: 'удаленная3',
        },
      ],
    };
  },
  components: {
    DictionaryCard,
  },
  methods: {
    toogleTab(tab) {
      if (tab === 'lern') {
        this.isLernTab = true;
      } else {
        this.isLernTab = false;
      }
      if (tab === 'difficult') {
        this.isDifficultTab = true;
      } else {
        this.isDifficultTab = false;
      }
      if (tab === 'deleted') {
        this.isDeletedTab = true;
      } else {
        this.isDeletedTab = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
$line-top-position: 70px;

.dictionary {
  width: 100%;
  height: 100%;
  padding: 0 16px;
  background-color: $color-catskill-white;

  &__tabs {
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;
  }

  &__tab {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: $line-top-position;

    .tab-name {
      color: $color-manatee;
      cursor: pointer;
    }

    .tab-line {
      position: absolute;
      top: $line-top-position;
      width: 358px;
      border-bottom: 4px solid $color-manatee;
      border-radius: 4px;
    }
  }

  .checked {
    .tab-name {
      color: $color-dodger-blue;
      cursor: pointer;
    }

    .tab-line {
      border-bottom: 4px solid $color-dodger-blue;
    }
  }
}

.dictionary__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  margin-bottom: 16px;

  &__buttons {
    button {
      padding: 16px 60px;
      margin-right: 8px;
      font-size: 20px;
      line-height: 24px;
      color: white;
      border: none;
      border-radius: 20px;
      outline: none;
    }

    .lern-btn {
      background-color: $color-dodger-blue;
    }

    .diff-btn {
      color: $color-pickled-bluewood;
      background-color: $color-golden-dream;
    }

    .del-btn {
      background-color: $color-wild-watermelon;
    }
  }
}
</style>
