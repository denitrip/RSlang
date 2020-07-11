<template>
  <div class="our-team">
    <div class="our-team__wrapper">
      <div class="our-team__card" v-for="man in people" v-show="man.show" :key="man">
        <img :src="man.image" alt="img" class="our-team__img" />
        <img :src="man.imageSmall" alt="img" class="our-team__img-small" />
        <div class="our-team__information">
          <h3 class="our-team__name">{{ man.name }}</h3>
          <h5 class="our-team__major">{{ man.major }}</h5>
          <p class="our-team__my-work">
            {{ man.myWork }}
          </p>
          <div class="our-team__contacts">
            <a :href="`https://t.me/${man.telegram}`" target="_blank">
              <span class="icon-circle icon-circle_blue">
                <span class="icon">
                  <IconBase width="19" height="16" viewBox="0 0 19 16" icon-color="white">
                    <IconTelegram />
                  </IconBase>
                </span>
              </span>
            </a>
            <a :href="`https://www.linkedin.com/in/${man.linkedin}/`" target="_blank">
              <span class="icon-circle icon-circle_blue">
                <span class="icon icon_linkedin">
                  <IconBase width="20" height="19" viewBox="0 0 15 18" icon-color="white">
                    <IconLinkedin />
                  </IconBase>
                </span>
              </span>
            </a>
            <a :href="`https://discord.gg/${man.discord}`" target="_blank">
              <span class="icon-circle icon-circle_blue">
                <span class="icon">
                  <IconBase width="20" height="19" viewBox="0 0 20 19" icon-color="white">
                    <IconDiscord />
                  </IconBase>
                </span>
              </span>
            </a>
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
          image: require('../assets/img/ourTeamImages/bigPhoto/Dzianis.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Denis.png'),
          name: 'Dzianis Puchko',
          major: 'Mentor',
          linkedin: 'dpuchko',
          telegram: 'denitrip',
          discord: '#',
          show: true,
          myWork: `Mentoring, coordination and motivation of the team. 
            Consultations in the development of approaches. 
            Scrum-master of the project.`,
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Yaroslav.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Yaroslav.png'),
          name: 'Yaroslav Denisyuk',
          major: 'Team Lead',
          show: true,
          linkedin: 'arcanar7',
          telegram: 'arcanar7',
          discord: 'bnBGK5',
          myWork: `Implement custom game, English puzzle mini-game, 
            Savannah game, Audiocall game, 
            Interval repetition logic, connect statistic and settings, 
            logout logic, project configurations, adaptive.
            `,
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Oleg.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Oleg.png'),
          name: 'Oleg Rashinskiy',
          major: SOFTWARE_ENGINEER,
          show: true,
          linkedin: 'olegrashinskiy',
          telegram: 'OlegAwesome',
          discord: '#',
          myWork: `Implement SpeakIt mini-game, 
            connect statistic SpeakIt with backend, our team page, 
            dictionary page, dictionary card, learning card, 
            cards responsive design, 
            mobile view for dictionary card.`,
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Andrey.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Andrei.png'),
          name: 'Andrei Karol',
          major: SOFTWARE_ENGINEER,
          show: true,
          linkedin: 'andreykorol2019',
          telegram: 'Remy_lee',
          discord: 'PkwKxe',
          myWork: `Sprint mini-game, login form, dictionary page, 
            learning page and card, 
            connect statistic page with backend, 
            "settings" page, add favicon, 
            adaptive for dictionary page, sidemenu mobile.`,
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Ruslan.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Ruslan.png'),
          name: 'Ruslan Bobreshov',
          major: SOFTWARE_ENGINEER,
          show: true,
          linkedin: '#',
          telegram: 'DavidSarif',
          discord: 'R4U7VG',
          myWork: `Start page/login, promo-video, 
            selling presentation, the project's readme, 
            login form, saving of settings on backend, 
            load users settings, home page,
            routing, save settings locally, redirect.`,
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Vasiliy.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Vasiliy.png'),
          name: 'Vasiliy Suhovenko',
          major: SOFTWARE_ENGINEER,
          show: true,
          linkedin: 'vsuhovenko',
          telegram: 'svd_bel',
          discord: 'EX2yRH',
          myWork: `Sprint mini-game, 
          connect statistic Sprint with backend, 
          homepage template, sidemenu, sidemenu routing, 
          statistic canvas graph, main header.`,
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Dzhangar.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Dzhangar.png'),
          name: 'Dzhangar Zolvanov',
          major: SOFTWARE_ENGINEER,
          show: true,
          linkedin: '#',
          telegram: 'dajiquwe',
          discord: '#',
          myWork: `Main page header, notification menu and functionality, 
            welcome page "start learning" and "watch video" logic, 
            custom game idea, user info into header, notification message "settings".`,
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Anastasiya.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Anastasiya.png'),
          name: 'Anastasiya Homanava',
          major: 'Experience Designer',
          show: false,
          linkedin: 'anastasiyahomanava',
          telegram: 'nastya_mishami',
          discord: '#',
          myWork: 'Development user interface and user experience design.',
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
