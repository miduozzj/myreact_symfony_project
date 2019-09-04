<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/app", name="home")
     */
    public function indexAction()
    {
        return $this->render('default/index.html.twig');
    }
    /**
     * @Route("/app/{reactRouting}", defaults={"reactRouting": null})
     */
    public function index1Action()
    {
        return $this->render('default/index.html.twig');
    }
    /**
     * @Route("/app/dashboard/{reactRouting}", defaults={"reactRouting": null})
     */
    public function index2Action()
    {
        return $this->render('default/index.html.twig');
    }
    /**
     * @Route("/app/puzzlecards/{reactRouting}", defaults={"reactRouting": null})
     */
    public function index3Action()
    {
        return $this->render('default/index.html.twig');
    }
}