import React from 'react';
import { useI18n } from '../../../i18n/useI18n';

export const SectionProblem: React.FC = () => {
  const { language } = useI18n();

  const problemsEn = [
    {
      num: '01',
      title: 'Manual Document Review Fatigue',
      desc: 'Regulatory officers must manually cross-reference 50+ page dossiers across state approvals, university affiliations, land records, and notary affidavits, creating inadvertent omissions.',
    },
    {
      num: '02',
      title: 'Fragmented & Siloed Evidence',
      desc: 'Accreditation registries, building approvals, and fire safety records sit in disconnected databases, leaving officers without a unified evidence trail.',
    },
    {
      num: '03',
      title: 'Inconsistent Compliance Checks',
      desc: 'Complex handbook clauses with formula calculations and regional tolerances are interpreted inconsistently across different regional inspection committees.',
    },
    {
      num: '04',
      title: 'Fraud & Exact Duplicate Risk',
      desc: 'Title deeds, equipment purchase invoices, and faculty lists are duplicated across multiple institutional applications without systemic cross-application detection.',
    },
    {
      num: '05',
      title: 'Infrastructure Verification Burden',
      desc: 'Campus geo-coordinates, floor plans, and lab photos require tedious physical audits without pre-validated digital geometry or tamper verification.',
    },
  ];

  const problemsHi = [
    {
      num: '01',
      title: 'मैन्युअल दस्तावेज़ समीक्षा का बोझ',
      desc: 'नियामक अधिकारियों को राज्य अनुमोदनों, संबद्धता प्रमाणपत्रों, भूमि रिकॉर्ड और नोटरी हलफनामों में 50+ पृष्ठों के डोजियर की मैन्युअल जांच करनी पड़ती है।',
    },
    {
      num: '02',
      title: 'खंडित एवं अलग-थलग साक्ष्य',
      desc: 'प्रत्यायन रजिस्ट्रियां, भवन अनुमोदन और अग्निशमन सुरक्षा रिकॉर्ड अलग-अलग पोर्टलों में बिखरे हैं, जिससे एक एकीकृत साक्ष्य श्रृंखला नहीं बन पाती।',
    },
    {
      num: '03',
      title: 'असंगत अनुपालन जांच',
      desc: 'पुस्तिका के जटिल सूत्र-आधारित नियम और क्षेत्रीय रियायतें विभिन्न निरीक्षण समितियों द्वारा अलग-अलग तरीके से लागू की जाती हैं।',
    },
    {
      num: '04',
      title: 'जालसाज़ी एवं प्रतिलिपि का जोखिम',
      desc: 'भूमि विलेख, प्रयोगशाला उपकरण बिल और संकाय सूचियां बिना किसी केंद्रीय पहचान प्रणाली के कई संस्थानों में दोहराई जाती हैं।',
    },
    {
      num: '05',
      title: 'भौतिक अवसंरचना सत्यापन की जटिलता',
      desc: 'परिसर के भू-स्थान निर्देशांक, भवन तल योजनाएं और प्रयोगशाला तस्वीरें बिना पूर्व-सत्यापित ज्यामिति के भारी भौतिक ऑडिट की मांग करती हैं।',
    },
  ];

  const list = language === 'hi' ? problemsHi : problemsEn;

  return (
    <section className="py-24 px-6 md:px-12 border-b border-hairline bg-paper">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-slate mb-4">
          <span className="font-bold text-ink">02 —</span>
          <span>{language === 'hi' ? 'समस्या एवं नियामक चुनौतियां' : 'The Regulatory Dilemma'}</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-ink uppercase mb-16">
          {language === 'hi'
            ? 'निर्णय लेना कठिन क्यों है?'
            : 'Why application verification breaks.'}
        </h2>

        <div className="divide-y divide-hairline">
          {list.map((item) => (
            <div
              key={item.num}
              className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline group hover:bg-bone/20 transition-colors px-4 -mx-4"
            >
              <div className="md:col-span-2 font-mono text-3xl font-light text-slate group-hover:text-ink transition-colors">
                {item.num} /
              </div>
              <div className="md:col-span-4 font-display font-bold text-xl md:text-2xl text-ink">
                {item.title}
              </div>
              <div className="md:col-span-6 font-sans text-sm md:text-base text-slate leading-relaxed">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
