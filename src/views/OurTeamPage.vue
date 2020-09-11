<template>
  <div class="our-team">
    <div class="our-team__wrapper">
      <div class="our-team__card" v-for="man in people" :key="man.name">
        <img :src="man.image" alt="img" class="our-team__img" />
        <img :src="man.imageSmall" alt="img" class="our-team__img-small" />
        <div class="our-team__information">
          <div>
            <h3 class="our-team__name">{{ man.name }}</h3>
            <h5 class="our-team__major">{{ man.major }}</h5>
            <p class="our-team__my-work">{{ man.myWork }}</p>
          </div>
          <div class="our-team__contacts">
            <a
              :href="`https://t.me/${man.telegram}`"
              target="_blank"
              :title="$t('ourTeam.telegramIcon')"
            >
              <span class="icon-circle icon-circle_telegram">
                <span class="icon">
                  <IconBase
                    :iconName="$t('ourTeam.telegramIcon')"
                    width="19"
                    height="16"
                    viewBox="0 0 19 16"
                  >
                    <IconTelegram />
                  </IconBase>
                </span>
              </span>
            </a>
            <a
              :href="`https://www.linkedin.com/in/${man.linkedin}/`"
              target="_blank"
              :title="$t('ourTeam.linkedInIcon')"
            >
              <span class="icon-circle icon-circle_linkedin">
                <span class="icon icon_linkedin">
                  <IconBase
                    :iconName="$t('ourTeam.linkedInIcon')"
                    width="20"
                    height="19"
                    viewBox="0 0 15 18"
                  >
                    <IconLinkedin />
                  </IconBase>
                </span>
              </span>
            </a>
            <a
              :href="`https://discord.gg/${man.discord}`"
              target="_blank"
              :title="$t('ourTeam.discordIcon')"
            >
              <span class="icon-circle icon-circle_discord">
                <span class="icon">
                  <IconBase
                    :iconName="$t('ourTeam.discordIcon')"
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                  >
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

export default {
  name: 'OurTeamPage',
  data() {
    return {
      people: [
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Dzianis.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Denis.png'),
          name: this.$t('ourTeam.member1.name'),
          major: this.$t('ourTeam.member1.major'),
          linkedin: 'dpuchko',
          telegram: 'denitrip',
          discord: '#',
          myWork: this.$t('ourTeam.member1.myWork'),
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Yaroslav.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Yaroslav.png'),
          name: this.$t('ourTeam.member2.name'),
          major: this.$t('ourTeam.member2.major'),
          linkedin: 'arcanar7',
          telegram: 'arcanar7',
          discord: 'XYF4Yy',
          myWork: this.$t('ourTeam.member2.myWork'),
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Oleg.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Oleg.png'),
          name: this.$t('ourTeam.member3.name'),
          major: this.$t('ourTeam.member3.major'),
          linkedin: 'olegrashinskiy',
          telegram: 'OlegAwesome',
          discord: '#',
          myWork: this.$t('ourTeam.member3.myWork'),
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Andrey.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Andrei.png'),
          name: this.$t('ourTeam.member4.name'),
          major: this.$t('ourTeam.member4.major'),
          linkedin: 'andreykorol2019',
          telegram: 'Remy_lee',
          discord: 'PkwKxe',
          myWork: this.$t('ourTeam.member4.myWork'),
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Ruslan.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Ruslan.png'),
          name: this.$t('ourTeam.member5.name'),
          major: this.$t('ourTeam.member5.major'),
          linkedin: '#',
          telegram: 'DavidSarif',
          discord: 'R4U7VG',
          myWork: this.$t('ourTeam.member5.myWork'),
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Vasiliy.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Vasiliy.png'),
          name: this.$t('ourTeam.member6.name'),
          major: this.$t('ourTeam.member6.major'),
          linkedin: 'vsuhovenko',
          telegram: 'svd_bel',
          discord: 'EX2yRH',
          myWork: this.$t('ourTeam.member6.myWork'),
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Dzhangar.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Dzhangar.png'),
          name: this.$t('ourTeam.member7.name'),
          major: this.$t('ourTeam.member7.major'),
          linkedin: '#',
          telegram: 'dajiquwe',
          discord: '#',
          myWork: this.$t('ourTeam.member7.myWork'),
        },
        {
          image: require('../assets/img/ourTeamImages/bigPhoto/Anastasiya.png'),
          imageSmall: require('../assets/img/ourTeamImages/smallPhoto/Anastasiya.png'),
          name: this.$t('ourTeam.member8.name'),
          major: this.$t('ourTeam.member8.major'),
          linkedin: 'anastasiyahomanava',
          telegram: 'nastya_mishami',
          discord: '#',
          myWork: this.$t('ourTeam.member8.myWork'),
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
  background-color: $color-catskill-white;

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
    display: flex;
    width: 545px;
    margin: 6px 0;
    overflow: hidden;
    background-color: $color-white;
    border-radius: 25px;

    @include media-tablet {
      flex-direction: column;
      width: 250px;
    }
  }

  &__img-small {
    display: none;
    object-fit: cover;

    @include media-tablet {
      display: block;
      width: 250px;
    }
  }

  &__img {
    width: 187px;
    object-fit: cover;

    @include media-tablet {
      display: none;
    }
  }

  &__information {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 310px;
    height: 100%;
    padding-top: 35px;
    padding-bottom: 24px;
    padding-left: 24px;

    @include media-tablet {
      width: auto;
      padding: 16px 17px 8px 17px;
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
  color: $color-mine-shaft;
  cursor: pointer;
  border: 1px solid $color-mine-shaft;
  border-radius: 25px;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;

  @include media-tablet {
    width: 30px;
    height: 30px;
  }
}

@media (hover: hover) {
  .icon-circle:hover {
    color: $color-white;
  }

  .icon-circle_telegram:hover {
    background-color: $color-lochmara;
    border-color: $color-lochmara;
  }

  .icon-circle_linkedin:hover {
    background-color: $color-blue-chill;
    border-color: $color-blue-chill;
  }

  .icon-circle_discord:hover {
    background-color: $color-chetwode-blue;
    border-color: $color-chetwode-blue;
  }
}
</style>
