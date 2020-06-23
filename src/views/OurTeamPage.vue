<template>
  <div class="our-team">
    <div class="our-team__wrapper">
      <div class="our-team__card" v-for="man in people" :key="man.name">
        <img :src="man.image" alt="img" class="our-team__img" />
        <img :src="man.imageSmall" alt="img" class="our-team__img-small" />
        <div class="our-team__information">
          <h3 class="our-team__name">{{ man.name }}</h3>
          <h5 class="our-team__major">{{ man.major }}</h5>
          <p class="our-team__my-work">
            Тут мы рассказываем, какие мы молодцы и какой вклад внесли в разработку приложения. Тут
            мы рассказываем, какие мы молодцы и какой вклад внесли в разработку приложения
          </p>
          <div class="our-team__contacts">
            <span class="icon-circle icon-circle_blue">
              <span class="icon">
                <IconBase width="19" height="16" viewBox="0 0 19 16" icon-color="white">
                  <IconTelegram />
                </IconBase>
              </span>
            </span>
            <span class="icon-circle icon-circle_blue">
              <span class="icon icon_linkedin">
                <IconBase width="15" height="14" viewBox="0 0 15 14" icon-color="white">
                  <IconLinkedin />
                </IconBase>
              </span>
            </span>
            <span class="icon-circle icon-circle_blue">
              <span class="icon">
                <IconBase width="20" height="19" viewBox="0 0 20 19" icon-color="white">
                  <IconDiscord />
                </IconBase>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconTelegram from '@/components/icons/IconTelegram.vue';
import IconLinkedin from '@/components/icons/IconLinkedin.vue';
import IconDiscord from '@/components/icons/IconDiscord.vue';

const SOFTWARE_ENGINEER = 'Software engineer';
export default {
  name: 'OurTeamPage',
  data() {
    return {
      people: [
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Oleg.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Oleg.png'),
          name: 'Oleg Rashinskiy',
          major: SOFTWARE_ENGINEER,
          myWork:
            'Тут мы рассказываем, какие мы молодцы и какой вклад внесли в разработку приложения. Тут мы рассказывае какие мы молодцы и какой вклад внесли в разработку приложения',
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Andrey.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Andrei.png'),
          name: 'Andrei Karol',
          major: SOFTWARE_ENGINEER,
          myWork:
            'Тут мы рассказываем, какие мы молодцы и какой вклад внесли в разработку приложения. Тут мы расскаваем, какие мы молодцы и какой вклад внесли в разработку приложения',
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Yaroslav.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Yaroslav.png'),
          name: 'Yaroslav Denisyuk',
          major: SOFTWARE_ENGINEER,
          myWork:
            'Тут мы рассказываем, какие мы молодцы и какой вклад внесли в разработку приложения. Т мы рассказываем, какие мы молодцы и какой вклад внесли в разработку приложения',
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Dzianis.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Denis.png'),
          name: 'Dzianis Puchko',
          major: 'Team Lead',
          myWork:
            'Тут мы рассказываем, какие мы молодцы и какой вклад внесли в разработку приложения. Тут мы рассказываем, кие мы молодцы и какой вклад внесли в разработку приложения',
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Vasiliy.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Vasiliy.png'),
          name: 'Vasiliy Sukhavenka',
          major: SOFTWARE_ENGINEER,
          myWork:
            'Тут мы рассказываем, какие мы молодцы и какой вклад внесли в разработку приложения. Тут мы рссказываем, какие мы молодцы и какой вклад внесли в разработку приложения',
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Dzhangar.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Dzhangar.png'),
          name: 'Dzhangar Zolvanov',
          major: SOFTWARE_ENGINEER,
          myWork:
            'Тут мы рассказываем, какие мы молодцы и какой вклад внесли в разработку приложения. Тут м рассказываем, какие мы молодцы и какой вклад внесли в разработку приложения',
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Ruslan.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Ruslan.png'),
          name: 'Ruslan Bobreshov',
          major: SOFTWARE_ENGINEER,
          myWork:
            'Тут мы рассказываем, какие мы молодцы и какой вклад внесли в разработку приложения. Ту мы рассказываем, какие мы молодцы и какой вклад внесли в разработку приложения',
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Anastasiya.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Anastasiya.png'),
          name: 'Anastasiya Homanava',
          major: 'Experience Designer',
          myWork:
            'Тут мы рассказываем, какие мы молодцы и какой вклад внесли в разработку приложения. Тт мы рассказываем, какие мы молодцы и какой вклад внесли в разработку приложения',
        },
      ],
    };
  },
  components: {
    IconBase,
    IconTelegram,
    IconLinkedin,
    IconDiscord,
  },
};
</script>

<style scoped lang="scss">
.our-team {
  padding: 35px 0 45px 0;
  background-color: $color-ghost;

  @include media-tablet {
    padding: 10px 0 15px 0;
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    max-width: $content-width;
    margin: auto;
  }

  &__card {
    display: inline-flex;
    width: 545px;
    height: 275px;
    margin: 6px 0;
    background-color: $color-white;
    border-radius: 25px;

    @include media-tablet {
      display: flex;
      flex-direction: column;
      width: 250px;
      height: 380px;
    }
  }

  &__img-small {
    display: none;

    @include media-tablet {
      display: block;
      width: 250px;
      height: 151px;
    }
  }

  &__img {
    width: 187px;
    height: 275px;

    @include media-tablet {
      display: none;
    }
  }

  &__information {
    width: 310px;
    height: 199px;
    margin-top: 35px;
    margin-left: 24px;

    @include media-tablet {
      width: auto;
      height: 199px;
      margin: 16px 17px 8px 17px;
    }
  }

  &__name {
    margin-bottom: 5px;

    @include font($size: 18px, $height: 22px);

    @include media-tablet {
      margin-bottom: 4px;

      @include font($size: 18px, $height: 22px);
    }
  }

  &__major {
    margin-bottom: 8px;

    @include font($size: 16px, $height: 18px, $weight: 300);

    color: $color-ghost;

    @include media-tablet {
      margin-bottom: 8px;

      @include font($size: 16px, $height: 18px, $weight: 300);
    }
  }

  &__my-work {
    margin-bottom: 17px;

    @include media-tablet {
      margin-bottom: 8px;

      @include font($size: 14px, $height: 16px, $weight: normal);
    }
  }

  &_contacts {
    @include media-tablet {
      margin-bottom: 5px;
    }
  }
}

.icon {
  display: inline-block;
}

.icon-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-right: 8px;
  cursor: pointer;
  border-radius: 25px;

  @include media-tablet {
    width: 30px;
    height: 30px;
  }

  &_blue {
    background-color: $color-cornflower-blue;
  }
}
</style>
