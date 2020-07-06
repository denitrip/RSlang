<template>
  <div class="dictionary" id="dictionaryPage">
    <div class="dictionary__tabs">
      <div
        class="dictionary__tab"
        :class="{ checked: isLernedTab }"
        @click="toogleTab(wordGroups.learned)"
      >
        Learned words
      </div>
      <div
        class="dictionary__tab"
        :class="{ checked: isDifficultTab }"
        @click="toogleTab(wordGroups.difficult)"
      >
        Difficult
      </div>
      <div
        class="dictionary__tab"
        :class="{ checked: isDeletedTab }"
        @click="toogleTab(wordGroups.deleted)"
      >
        Deleted
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="tab-wrapper" :key="getTab" :class="{ 'tab-wrapper_loading': isChangeLoading }">
        <div class="dictionary__controls">
          <div class="dictionary__controls__checked">
            <b-form-checkbox name="checkbox-checked-cards" size="lg" v-model="selectAll">
              Selected {{ selectedWords.length }} words
            </b-form-checkbox>
          </div>
          <AppSpinner
            v-if="isChangeLoading"
            size="lds-spinner_small-plus"
            colorName="color-dodger-blue"
          />
          <div class="dictionary__controls__buttons">
            <button
              class="lern-btn"
              v-if="!isLernedTab"
              :disabled="!selectedWords.length || isChangeLoading"
              @click="changeWordsDifficulty(wordGroups.learned)"
            >
              Learned
            </button>
            <button
              class="diff-btn"
              v-if="!isDifficultTab"
              :disabled="!selectedWords.length || isChangeLoading"
              @click="changeWordsDifficulty(wordGroups.difficult)"
            >
              Difficult
            </button>
            <button
              class="del-btn"
              v-if="!isDeletedTab"
              :disabled="!selectedWords.length || isChangeLoading"
              @click="changeWordsDifficulty(wordGroups.deleted)"
            >
              Delete
            </button>
          </div>
        </div>
        <AppSpinner v-if="isWordsLoading" size="lds-spinner_large" colorName="color-dodger-blue" />
        <div class="cards-wrapper" v-else>
          <div class="dictionary__cards" v-if="wordsArray.length" key="cards">
            <dictionary-card
              v-for="card in paginationArray"
              :key="card.word"
              :word="card"
            ></dictionary-card>
            <b-pagination
              class="pagination"
              v-model="currentPage"
              :total-rows="wordsArray.length"
              :per-page="perPage"
              :pagination-simple="true"
              pills
              first-number
              last-number
            ></b-pagination>
          </div>
          <div class="empty-words" v-else key="empty">
            The list of words is empty.
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import AppSpinner from '@/components/AppSpinner.vue';
import DictionaryCard from '@/components/DictionaryCard.vue';
import { wordGroups } from '@/helpers/constants.helper';

export default {
  name: 'DictionaryPage',
  components: {
    DictionaryCard,
    AppSpinner,
  },
  data() {
    return {
      isLernedTab: true,
      isDifficultTab: false,
      isDeletedTab: false,
      isWordsLoading: false,
      isChangeLoading: false,
      wordGroups,
      currentPage: 1,
      perPage: 5,
    };
  },
  computed: {
    ...mapState('Learning', ['userWords']),

    selectAll: {
      get() {
        if (this.wordsArray.length) {
          return this.wordsArray.every((item) => item.selected);
        }
        return false;
      },
      set(value) {
        const newUserWords = this.userWords.map((item) => {
          if (this.isLernedTab && item.userWord.difficulty === wordGroups.learned) {
            return { ...item, selected: value };
          }
          if (this.isDifficultTab && item.userWord.difficulty === wordGroups.difficult) {
            return { ...item, selected: value };
          }
          if (this.isDeletedTab && item.userWord.difficulty === wordGroups.deleted) {
            return { ...item, selected: value };
          }
          return item;
        });
        this.setUserWords(newUserWords);
      },
    },
    learnedWords() {
      return this.userWords.filter((item) => item.userWord.difficulty === wordGroups.learned);
    },
    difficultWords() {
      return this.userWords.filter((item) => item.userWord.difficulty === wordGroups.difficult);
    },
    deletedWords() {
      return this.userWords.filter((item) => item.userWord.difficulty === wordGroups.deleted);
    },
    wordsArray() {
      if (this.isLernedTab) {
        return this.learnedWords;
      }
      if (this.isDifficultTab) {
        return this.difficultWords;
      }
      return this.deletedWords;
    },
    paginationArray() {
      return this.wordsArray.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage,
      );
    },
    selectedLearnedWords() {
      return this.learnedWords.filter((item) => item.selected);
    },
    selectedDifficultWords() {
      return this.difficultWords.filter((item) => item.selected);
    },
    selectedDeletedWords() {
      return this.deletedWords.filter((item) => item.selected);
    },
    selectedWords() {
      if (this.isLernedTab) {
        return this.selectedLearnedWords;
      }
      if (this.isDifficultTab) {
        return this.selectedDifficultWords;
      }
      return this.selectedDeletedWords;
    },
    getTab() {
      if (this.isLernedTab) {
        return this.wordGroups.learned;
      }
      if (this.isDifficultTab) {
        return this.wordGroups.difficult;
      }
      return this.wordGroups.deleted;
    },
  },
  async created() {
    this.isWordsLoading = true;
    try {
      await this.getAllUserWords();
    } catch (error) {
      this.setError(error.message);
    } finally {
      this.isWordsLoading = false;
    }
  },
  methods: {
    ...mapActions('Learning', ['getAllUserWords', 'changeUserWordDifficulty']),
    ...mapActions('Error', ['setError']),
    ...mapMutations('Learning', ['setUserWords']),

    toogleTab(tab) {
      if (tab === this.wordGroups.learned) {
        this.isLernedTab = true;
        this.isDifficultTab = false;
        this.isDeletedTab = false;
      } else if (tab === this.wordGroups.difficult) {
        this.isLernedTab = false;
        this.isDifficultTab = true;
        this.isDeletedTab = false;
      } else if (tab === this.wordGroups.deleted) {
        this.isLernedTab = false;
        this.isDifficultTab = false;
        this.isDeletedTab = true;
      }
    },
    async changeWordsDifficulty(difficulty) {
      this.isChangeLoading = true;
      try {
        const promise = [];
        this.selectedWords.forEach((item) => {
          const changedWord = this.changeUserWordDifficulty({
            difficulty,
            word: item,
          });
          promise.push(changedWord);
        });
        await Promise.all(promise);

        const newUserWords = this.userWords.map((item) => {
          const changedWord = this.selectedWords.find((i) => i.word === item.word);
          if (changedWord) {
            return {
              ...item,
              selected: false,
              userWord: { difficulty, optional: item.userWord.optional },
            };
          }
          return item;
        });
        this.setUserWords(newUserWords);
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isChangeLoading = false;
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
  padding: 0 10px 8px 10px;
  background-color: $color-catskill-white;

  &__tabs {
    display: flex;
    margin-bottom: 30px;

    @include media-mobile {
      justify-content: space-between;
      margin-bottom: 20px;

      @include font(10px);
    }
  }

  &__tab {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% / 3);
    height: $line-top-position;
    font-size: 24px;
    font-weight: 500;
    color: $color-manatee;
    cursor: pointer;
    border-bottom: 4px solid $color-manatee;
    transition: color 0.3s, border-color 0.3s;

    @include media-mobile {
      height: 45px;
      text-align: center;

      @include font(0.9rem);
    }

    &:not(:first-child) {
      margin-left: 10px;

      @include media-mobile {
        margin-left: 0;
      }
    }
  }

  .checked {
    color: $color-dodger-blue;
    cursor: default;
    border-bottom: 4px solid $color-dodger-blue;

    @include media-mobile {
      width: 60px;
    }

    @include media-mobile {
      @include font($size: 1.18rem, $height: 13px);
    }
  }
}

.dictionary__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 40px;
  margin-bottom: 16px;

  @include media-laptop {
    padding: 0 20px;
    margin-bottom: 8px;
  }

  @include media-tablet {
    flex-direction: column-reverse;
    padding: 0 8px;
    margin-bottom: 8px;
  }

  @include media-mobile {
    padding: 0 0;
    margin-bottom: 8px;
  }

  &__buttons {
    margin-left: 5px;

    button {
      padding: 16px 60px;
      margin-right: 8px;
      font-size: 20px;
      line-height: 24px;
      color: white;
      border: none;
      border-radius: 20px;
      outline: none;
      transition: opacity 0.3s;

      @include media-laptop {
        padding: 16px 42px;
        margin: 4px 4px 4px 4px;
      }

      @include media-mobile {
        width: 100%;
        padding: 16px 30px;
        margin: 4px 0 4px 2px;

        @include font($size: 15px, $height: 17px);
      }

      &:disabled {
        pointer-events: none;
        cursor: default;
        opacity: 0.4;
      }
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

.tab-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  &_loading {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }
}

.cards-wrapper {
  width: 100%;
}

.empty-words {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  font-size: 26px;
  color: $color-manatee;
  text-align: center;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
