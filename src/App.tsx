import { FormEvent, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, CalendarDays, Check, ChevronDown, Menu, ShieldCheck, Sparkles, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const treatments = [
  { title: 'Toxina botulínica', text: 'Suavização estratégica de linhas de expressão, preservando gestos e identidade.', tag: 'Expressão' },
  { title: 'Bioestimuladores', text: 'Protocolos que apoiam firmeza e qualidade da pele de forma gradual.', tag: 'Firmeza' },
  { title: 'Preenchimento facial', text: 'Planejamento de proporções e contornos com indicação individualizada.', tag: 'Harmonia' },
  { title: 'Skin quality', text: 'Cuidado integrado para viço, textura, hidratação e aparência descansada.', tag: 'Luminosidade' },
]

const faqs = [
  ['O resultado fica natural?', 'O plano parte da sua anatomia, da sua expressão e do resultado que você considera natural. Quantidades, técnicas e expectativas são alinhadas durante a avaliação.'],
  ['Quanto tempo dura uma consulta?', 'A primeira avaliação reserva tempo para histórico, análise facial, prioridades e explicação das possibilidades. O procedimento só acontece quando houver indicação e segurança.'],
  ['Existe um protocolo igual para todos?', 'Não. A proposta da Auréa é demonstrativa, mas traduz um princípio real: estética responsável exige avaliação individual e não uma fórmula pronta.'],
]

function App() {
  const page = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formSent, setFormSent] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !page.current) return

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .from('.intro-mark span', { yPercent: 120, duration: 0.7, stagger: 0.05 })
        .to('.intro-progress span', { scaleX: 1, duration: 0.75, ease: 'power2.inOut' }, '-=.35')
        .to('.intro-curtain', { yPercent: -100, duration: 0.9, ease: 'power4.inOut' })
        .from('.hero-media', { clipPath: 'inset(0 0 100% 0)', duration: 1.4 }, '-=.45')
        .from('.hero-line > span', { yPercent: 110, duration: 1.1, stagger: 0.08 }, '-=1')
        .from('.hero-copy, .hero-actions, .hero-note', { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, '-=.65')
        .from('.hero-folio, .hero-coordinate', { autoAlpha: 0, duration: 0.7, stagger: 0.08 }, '-=.7')

      gsap.to('.hero-photo', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 60,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        })
      })

      gsap.utils.toArray<HTMLElement>('.treatment-card').forEach((card, index) => {
        gsap.from(card, {
          y: 80 + index * 12,
          rotate: index % 2 ? 1.5 : -1.5,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.treatment-grid', start: 'top 78%', once: true },
        })
      })

      gsap.to('.orbital-word', {
        rotate: 360,
        ease: 'none',
        scrollTrigger: { trigger: '.philosophy', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      })

      gsap.to('.scroll-progress', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      })

      gsap.to('.signature-sentence', {
        xPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: '.signature-statement', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      gsap.fromTo('.face-line path',
        { strokeDasharray: 900, strokeDashoffset: 900 },
        {
          strokeDashoffset: 0,
          duration: 2.2,
          stagger: 0.16,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '.philosophy-art', start: 'top 72%', once: true },
        },
      )
    }, page)

    return () => context.revert()
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString()
    try {
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
      setFormSent(true)
      form.reset()
    } catch {
      form.submit()
    }
  }

  return (
    <div ref={page}>
      <div className="intro-curtain" aria-hidden="true"><div className="intro-mark"><span>A</span><span>u</span><span>r</span><span>é</span><span>a</span></div><div className="intro-progress"><span /></div><p>Estética facial contemporânea</p></div>
      <div className="grain" aria-hidden="true" />
      <div className="scroll-rail" aria-hidden="true"><span className="scroll-progress" /></div>
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <div className="demo-bar">Experiência demonstrativa · marca e profissionais fictícios</div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Auréa, início"><span>A</span>uréa</a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#tratamentos">Tratamentos</a><a href="#metodo">Método</a><a href="#duvidas">Dúvidas</a>
        </nav>
        <a className="header-cta" href="#agendar">Agendar avaliação <ArrowUpRight size={16} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {menuOpen && <nav className="mobile-nav" aria-label="Navegação móvel"><a onClick={() => setMenuOpen(false)} href="#tratamentos">Tratamentos</a><a onClick={() => setMenuOpen(false)} href="#metodo">Método</a><a onClick={() => setMenuOpen(false)} href="#duvidas">Dúvidas</a><a onClick={() => setMenuOpen(false)} href="#agendar">Agendar avaliação</a></nav>}

      <main id="conteudo">
        <section className="hero" id="top">
          <div className="hero-content">
            <p className="kicker hero-copy">Medicina estética facial · cuidado individual</p>
            <h1><span className="hero-line"><span>Sua expressão,</span></span><span className="hero-line"><span>em sua melhor luz.</span></span></h1>
            <p className="hero-copy">Protocolos personalizados para suavizar sinais, valorizar contornos e cuidar da pele sem apagar o que faz você ser você.</p>
            <div className="hero-actions"><a className="button button-dark" href="#agendar">Agendar avaliação <ArrowUpRight size={18} /></a><a className="text-link" href="#tratamentos">Conhecer tratamentos <ArrowDown size={15} /></a></div>
            <div className="hero-note"><ShieldCheck size={18} /><span>Avaliação individual, expectativas alinhadas e decisões informadas.</span></div>
          </div>
          <div className="hero-media">
            <img className="hero-photo" src="/images/aurea-hero.jpg" width="1950" height="776" alt="Profissional de estética em consultório contemporâneo" />
            <div className="hero-light" aria-hidden="true" />
            <span className="hero-folio">Retrato de uma beleza que permanece sua</span>
            <span className="hero-coordinate">23°33′ S · cuidado em primeiro plano</span>
            <div className="hero-seal"><Sparkles size={18} /><span>Naturalidade<br />é precisão</span></div>
          </div>
          <p className="side-caption">Auréa · Estética facial contemporânea</p>
        </section>

        <div className="marquee" aria-hidden="true"><div>EXPRESSÃO PRESERVADA · PLANO INDIVIDUAL · CUIDADO CONSCIENTE · EXPRESSÃO PRESERVADA · PLANO INDIVIDUAL · CUIDADO CONSCIENTE · </div></div>

        <section className="section treatments" id="tratamentos">
          <div className="section-heading" data-reveal><p className="kicker">Possibilidades de cuidado</p><h2>O tratamento certo começa com uma boa conversa.</h2><p>Conheça caminhos possíveis. A indicação depende de avaliação profissional individual.</p></div>
          <div className="treatment-grid">
            {treatments.map((treatment, index) => <article className="treatment-card" key={treatment.title}><span className="card-watermark" aria-hidden="true">{index + 1}</span><span className="card-index">0{index + 1}</span><div className="line-icon"><span /></div><p className="card-tag">{treatment.tag}</p><h3>{treatment.title}</h3><p>{treatment.text}</p><a href="#agendar" aria-label={`Agendar avaliação para ${treatment.title}`}>Conversar sobre este cuidado <ArrowUpRight size={16} /></a></article>)}
          </div>
        </section>

        <section className="signature-statement" aria-label="Manifesto Auréa">
          <p className="signature-sentence">A medida do resultado é você ainda se reconhecer.</p>
          <div className="signature-meta"><span>Manifesto Auréa</span><span>Natural · preciso · individual</span></div>
        </section>

        <section className="philosophy" id="metodo">
          <div className="philosophy-art" data-reveal><div className="face-line" aria-hidden="true"><svg viewBox="0 0 420 520" fill="none"><path d="M255 42c-58 18-99 72-105 142-5 62 24 95 19 149-3 39-29 73-65 92 40 22 91 26 130 4 50-27 67-85 58-140-6-39-27-74-21-114 4-31 24-58 51-73-20-40-39-70-67-60Z"/><path d="M178 193c22-12 45-12 68-1M195 246c15 9 31 9 47-1M213 193v37"/><path d="M143 151c-23 8-40 24-51 47"/></svg></div><div className="orbital-word">PRECISÃO · LEVEZA · PRESENÇA · PRECISÃO · LEVEZA · PRESENÇA · </div></div>
          <div className="philosophy-copy" data-reveal><p className="kicker">Nosso ponto de vista</p><h2>Menos sobre mudar. Mais sobre reconhecer.</h2><p className="lead">Uma estética que observa antes de intervir e encontra equilíbrio sem uniformizar rostos.</p><div className="principles"><div><Check /><span><strong>Escuta atenta</strong>O plano nasce do que incomoda você, não de uma tendência.</span></div><div><Check /><span><strong>Decisão transparente</strong>Indicações, limites e cuidados explicados com clareza.</span></div><div><Check /><span><strong>Resultado progressivo</strong>Estratégias que respeitam tempo, anatomia e expressão.</span></div></div><a className="button button-light" href="#agendar">Agendar avaliação <ArrowUpRight size={18} /></a></div>
        </section>

        <section className="section journey">
          <div className="section-heading compact" data-reveal><p className="kicker">Da intenção ao cuidado</p><h2>Uma jornada sem pressa, com propósito.</h2></div>
          <div className="journey-track" data-reveal><article><span>Primeiro encontro</span><h3>Você conta. Nós escutamos.</h3><p>Histórico, prioridades e expectativas orientam a análise.</p></article><article><span>Plano individual</span><h3>Clareza antes da escolha.</h3><p>Possibilidades, cuidados e limites são apresentados sem pressão.</p></article><article><span>Acompanhamento</span><h3>Cuidado que continua.</h3><p>Orientações e revisão fazem parte da experiência.</p></article></div>
        </section>

        <section className="section faq" id="duvidas">
          <div className="faq-intro" data-reveal><p className="kicker">Antes de decidir</p><h2>Perguntas que merecem respostas claras.</h2><p>A avaliação presencial é o momento adequado para orientações clínicas individuais.</p></div>
          <div className="faq-list" data-reveal>{faqs.map(([q, a]) => <details key={q}><summary>{q}<ChevronDown size={20} /></summary><p>{a}</p></details>)}</div>
        </section>

        <section className="booking" id="agendar">
          <div className="booking-copy" data-reveal><p className="kicker">Seu próximo passo</p><h2>Vamos conversar sobre o que faz sentido para você.</h2><p>Preencha seus dados para solicitar uma avaliação. Esta é uma demonstração; nenhuma consulta real será agendada.</p><div className="booking-meta"><CalendarDays /><span>Retorno demonstrativo<br /><strong>em até 1 dia útil</strong></span></div></div>
          <div className="form-wrap" data-reveal>
            {formSent ? <div className="success" role="status"><Check /><h3>Solicitação recebida.</h3><p>Em um projeto real, a equipe entraria em contato para confirmar o melhor horário.</p></div> : <form name="avaliacao" method="POST" data-netlify="true" onSubmit={handleSubmit}><input type="hidden" name="form-name" value="avaliacao" /><div className="field"><label htmlFor="name">Como podemos chamar você?</label><input id="name" name="nome" type="text" autoComplete="name" required /></div><div className="field-row"><div className="field"><label htmlFor="phone">WhatsApp</label><input id="phone" name="whatsapp" type="tel" autoComplete="tel" required /></div><div className="field"><label htmlFor="interest">Interesse principal</label><select id="interest" name="interesse" defaultValue="" required><option value="" disabled>Selecione</option>{treatments.map(item => <option key={item.title}>{item.title}</option>)}</select></div></div><div className="field"><label htmlFor="message">O que você gostaria de cuidar?</label><textarea id="message" name="mensagem" rows={3} /></div><button className="button button-dark submit" type="submit">Solicitar avaliação <ArrowUpRight size={18} /></button><small>Ao enviar, você concorda com o contato para esta solicitação demonstrativa.</small></form>}
          </div>
        </section>
      </main>

      <footer><a className="brand footer-brand" href="#top"><span>A</span>uréa</a><p>Medicina estética com expressão preservada.</p><div><a href="#tratamentos">Tratamentos</a><a href="#duvidas">Dúvidas</a><a href="#agendar">Contato</a></div><small>© 2026 Auréa. Projeto conceitual demonstrativo — clínica, profissional e informações de contato fictícios.</small></footer>
    </div>
  )
}

export default App
